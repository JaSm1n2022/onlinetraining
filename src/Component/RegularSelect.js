import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RegularSelect(props) {
  const [key, setKey] = React.useState(props.seq || "");
  React.useEffect(() => {
    setKey(props.seq || 0);
  }, [props.seq]);
  const handleChange = (event) => {
    setKey(event.target.value);
    props.onChangeHandler(event.target.value);
  };
  const disabledHandler = (item, h) => {
    if (item.topic === "HIPAA" && props.currentSeq >= h) {
      return false;
    }
    return true;
  };

  return (
    <Box sx={{ minWidth: props.width || 120, height: 32 }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={key}
        style={{ background: "white", height: 28, width: props.width || 120 }}
        onChange={handleChange}
      >
        {props?.options?.map((row, h) => (
          <MenuItem
            value={row.value || row.seq}
            disabled={disabledHandler(row, h)}
          >
            {row.label || row.title}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
