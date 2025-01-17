import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

export default function RegularTimePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(props.name, e)}
        popperPlacement="bottom-end"
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "white",
            position: "bottom",
          },
        }}
      />
    </LocalizationProvider>
  );
}
