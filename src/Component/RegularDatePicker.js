import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function RegularDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={props.value}
        name={props.name}
        onChange={(e) => props.onChange(props.name, e)}
        sx={{ backgroundColor: "white", width: "100%", padding: 0 }}
        slots={{
          textField: (params) => (
            <TextField
              fullWidth
              {...params}
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
              }}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
}
