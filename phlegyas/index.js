import * as React from 'react';
import useSocket from '../hooks/useSocket'
import NavBar from '../components/NavBar';
import FluxMonitoring from '../components/monitoring/FluxMonitoring';
import { Grid } from '@mui/material';
import BotDisplay from '../components/BotDisplay';

export default function Home() {

	const socket = useSocket();

	function stand() {
		socket.emit('bot-commands', 'stand');
	}

	function crouch() {
		socket.emit('bot-commands', 'crouch');
	}

	function forward() {
		socket.emit('bot-commands', 'forward');
	}

	function backward() {
		socket.emit('bot-commands', 'backward');
	}

	function left() {
		socket.emit('bot-commands', 'left');
	}

	function right() {
		socket.emit('bot-commands', 'right');
	}

	return (
		<>
			<NavBar />
			
			<Grid container alignItems={"center"} justifyContent={"right"} padding={2} spacing={2}>
				<Grid item xs={10}>
					<BotDisplay/>
				</Grid>

				<Grid item xs={2}>
					<FluxMonitoring title="WS" color='#ab003c' />
				</Grid>

				
			</Grid>
		</>
	)
}