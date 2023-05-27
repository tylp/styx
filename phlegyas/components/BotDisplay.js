'use client';

import React from 'react';
import ServoController from './ServoController';


const Root = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '> p': {
        textAlign: 'left'
    }
}));

export default function BotDisplay() {
    return (
        <Root>
            <Grid container spacing={2}>
                <Grid item xs={6} flex>
                    <Typography variant="subtitle1" style={{textDecoration: "underline", fontWeight: "bold"}}>FLL</Typography>
                    <ServoController title="bottom motor" />
                    <ServoController title="mid motor" />
                    <ServoController title="top motor" />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{textDecoration: "underline", fontWeight: "bold"}}>FRL</Typography>
                    <ServoController title="bottom motor" />
                    <ServoController title="mid motor" />
                    <ServoController title="top motor" />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{textDecoration: "underline", fontWeight: "bold"}}>BLL</Typography>
                    <ServoController title="bottom motor" />
                    <ServoController title="mid motor" />
                    <ServoController title="top motor" />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{textDecoration: "underline", fontWeight: "bold"}}>BFL</Typography>
                    <ServoController title="bottom motor" />
                    <ServoController title="mid motor" />
                    <ServoController title="top motor" />
                </Grid>
            </Grid>
        </Root>
    );
}