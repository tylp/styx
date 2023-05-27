'use client';

import React, { useState } from 'react';

function valuetext(value) {
    return `${value}°`;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function ServoController(props) {
    const pin = props.pin;
    const title = props.title;
    const label = `${title} (pin${pin})`;

    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <>
            <Typography id="input-slider" gutterBottom>
                {label}
            </Typography>
            <Grid container alignItems={"center"}>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        aria-label="Small steps"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        step={10}
                        marks
                        min={0}
                        max={180}
                        aria-labelledby="input-slider"
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 180,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

ServoController.defaultProps = {
    title: "title",
    pin: 0
}