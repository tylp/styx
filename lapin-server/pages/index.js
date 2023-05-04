import * as React from 'react';
import useSocket from '../hooks/useSocket'
import NavBar from '../components/NavBar';
import FluxMonitoring from '../components/monitoring/FluxMonitoring';
import { Grid } from '@mui/material';
import BotDisplay from '../components/BotDisplay';

export default function Home() {

	const socket = useSocket();

	return (
		<>
			<NavBar />
			
			<Grid container alignItems={"center"} justifyContent={"right"} padding={2} spacing={2}>
				<Grid item xs={10}>

				</Grid>

				<Grid item xs={2}>
					<FluxMonitoring title="WS" color='#ab003c' />
				</Grid>

				
			</Grid>
		</>
	)
}