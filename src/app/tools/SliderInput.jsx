"use client";

import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { setMarks, setMarksInterest, setMarksYear } from "@/utils/helper";

const Input = styled(MuiInput)`
  width: 42px;
`;
export default function SliderInput({
  initial,
  start,
  limit,
  increment,
  label,
  AdornmentStart,
  AdornmentEnd,
  value,
  onInput,
  name,
  typeIs,
}) {
  const [marks, setMarks1] = useState([]);

  let marks1;
  useEffect(() => {
    if (typeIs === "percent") {
      marks1 = setMarksInterest(initial, start, limit, increment);
    } else if (typeIs === "price") {
      marks1 = setMarks(initial, start, limit, increment);
    } else if (typeIs === "year") {
      marks1 = setMarksYear(initial, start, limit, increment);
    }
    setMarks1(marks1);
  }, [initial, start, limit, increment]);

  const handleSliderChange = (event, newValue) => {
    onInput(event);
  };

  const handleInputChange = (event) => {
    onInput(event);
  };

  return (
    <div className="js-calculator_input-wrap ag-calculator_input-wrap">
      <div className="calc-input-mob">
        <label className="ag-calculator_label" htmlFor="level1-clients">
          {label}
        </label>

        <div
          className={
            typeIs === "price" ? "input-cal-price" : "input-cal-percent"
          }
        >
          <TextField
            size="small"
            id="outlined-basic"
            type="Number"
            name={name}
            InputProps={{
              inputProps: {
                min: initial,
                step: initial,
              },
              startAdornment: (
                <InputAdornment position="start">
                  {AdornmentStart}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">{AdornmentEnd}</InputAdornment>
              ),
            }}
            value={value}
            onChange={handleInputChange}
            // inputProps={{ inputProps: { min: 0, max: 10 } }}
            variant="outlined"
          />
        </div>
      </div>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs>
          <Slider
            value={value}
            // value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={initial}
            max={limit}
            step={initial}
            marks={marks}
            name={name}
          />
        </Grid>
        <div className="value-input">
          <Grid item xs={3}>
            <TextField
              size="small"
              id="outlined-basic"
              type="Number"
              name={name}
              InputProps={{
                inputProps: {
                  min: initial,
                  step: initial,
                },
              }}
              value={value}
              onChange={handleInputChange}
              // inputProps={{ inputProps: { min: 0, max: 10 } }}
              variant="outlined"
            />
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
