'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useSocket from '../hooks/useSocket';
import { DateTime } from 'luxon';
import useInterval from '../hooks/useInterval';

const Root = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '> p': {
        textAlign: 'left'
    }
}));

export default function FluxMonitoring(props) {

    const refreshRate = 1000;
    const maxPoints = 20;
    const socket = useSocket();

    const [ms, setMs] = useState(0);

    const reqTime = useRef(0);
    const repTime = useRef(0);

    // const [reqTime, setReqTime] = useState(0);
    // const [repTime, setRepTime] = useState(0);
    const [connected, setConnected] = useState(false);
    const [dataPoints, setDataPoints] = useState([]);

    const replyHandle = useCallback(() => {

        repTime.current = DateTime.local().toMillis();
        let diff = repTime.current - reqTime.current;

        setMs(diff);

        if (dataPoints.length == maxPoints) {
            dataPoints.shift();
        }

        setDataPoints((prev) => [...prev, { ping: ms }]);
    });

    const connectHandle = useCallback(() => {
        console.warn("WS up");
        setConnected(true)
    });

    const disconnectHandle = useCallback(() => {
        console.warn("WS down");
        setConnected(false);
    });

    useEffect(() => {

        if (!socket) return;

        socket.on("disconnect", disconnectHandle);
        socket.on("connect", connectHandle);
        socket.on("ws-health-check-reply", replyHandle);

        return () => {
            socket.off("disconnect");
            socket.off("onnect");
            socket.off("ws-health-check-reply");
        }
    }, [socket, connectHandle, disconnectHandle, replyHandle]);

    useInterval(() => {

        if (socket == null) {
            return;
        }

        reqTime.current = DateTime.local().toMillis();
        socket.emit("ws-health-check-request");
    }, refreshRate);

    return (
        <Root>
            <Typography variant='h6'>{props.title}</Typography>
            <ResponsiveContainer width="100%" height={80}>
                <LineChart width={300} height={100} data={dataPoints}>
                    <Line connectNulls type="monotone" dot={false} dataKey="ping" stroke={props.color} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
            <Grid container justifyContent={"space-between"}>
                <Grid item>
                    <Typography variant='body2'>{ms} ms</Typography>
                </Grid>
                <Grid item>
                    {
                        connected ? <BlurOnIcon color='success' /> : <BlurOnIcon color='error' />
                    }
                </Grid>
            </Grid>
        </Root>
    );
}

FluxMonitoring.defaultProps = {
    title: "Flux monitoring",
    color: "#8884d8"
}