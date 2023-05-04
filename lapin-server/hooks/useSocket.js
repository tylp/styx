import { useEffect, useState } from "react";
import io from "socket.io-client";


/**
 * Checks if a connexion to the ws server exists.
 * If this is the case, this ws instance is returned.
 * Otherwise a new instance is created and returned.
 * @param {*} cb 
 * @returns WS instance
 */
export default function useSocket(cb) {
	const [socket, setSocket] = useState(null)

	useEffect(() => {
		const socketIo = io()

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