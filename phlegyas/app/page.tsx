'use client';

import * as React from 'react';
import useSocket from '../hooks/useSocket'
import NavBar from '../components/NavBar';
import FluxMonitoring from '../components/FluxMonitoring';
import BotDisplay from '../components/BotDisplay';

export default function Home() {

	return (
		<div className='bg-background-dark min-h-screen'>
			<NavBar />
		</div>
	)
}