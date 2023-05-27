import { ClientToServerEvents, ServerToClientEvents } from "@/interfaces/sockets";
import { useEffect, useState } from "react";
import {io, Socket} from "socket.io-client";


/**
 * Checks if a connexion to the ws server exists.
 * If this is the case, this ws instance is returned.
 * Otherwise a new instance is created and returned.
 * @param {*} cb 
 * @returns WS instance
 */
export default function useSocket() {
	const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()

	useEffect(() => {
		const socketIo: Socket<ServerToClientEvents, ClientToServerEvents> = io()

		setSocket(socketIo)

		function cleanup() {
			socketIo.disconnect()
		}
		return cleanup

		// should only run once and not on every re-render,
		// so pass an empty array
	}, [])

	return socket
}