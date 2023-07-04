import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const SignalTest: Component<{}> = (props) => {
	const [connection, setConnection] = createSignal<HubConnection>();

	onMount(() => {
		const connection = new HubConnectionBuilder()
			.withUrl('http://localhost:5219/game')
			.withAutomaticReconnect()
			.build();

		setConnection(connection);
	});

	// connection().
	createEffect(() => {
		if (connection()) {
			connection()
				?.start()
				.then((result) => {
					console.log({ result });

					connection()?.on('ReceiveMessage', (message) => {
						console.log({ message });
					});
				})
				.catch(console.error);
		}
	});

	const handleChange = async ({ target: { value } }: any): Promise<void> => {
		// console.log({ value });
		if (connection()) {
			await connection()?.send('Send', value);
		}
	};

	return (
		<div>
			<input type='text' onInput={handleChange} />
		</div>
	);
};

export default SignalTest;
