import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Avatar, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  paddingLeft: 4,
  color: theme.palette.text.secondary,
  height: 40,
  lineHeight: "40px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function Pod(props) {
  return (
    <div
      style={{
        maxHeight: props.isMobile ? "300px" : "400px",
        overflow: "auto",
        width: "100%",
      }}
      align="left"
    >
      <Grid container spacing={2}>
        {props.dataSource?.map((item, index) => (
          <Grid item xs={props.isMobile ? 12 : 6} key={index}>
            <ThemeProvider theme={lightTheme}>
              <Box
                sx={{
                  borderRadius: 2,
                  bgcolor: "#56764c",
                  display: "grid",
                  align: "left",
                  paddingLeft: 2,
                  paddingRight: 2,
                  gridTemplateColumns: { md: "1fr" },
                }}
              >
                <Item elevation={1}>
                  <div style={{ display: "inline-flex", gap: 1 }} align="left">
                    <Typography>{index + 1}.</Typography>
                    <Typography>
                      {item.short_description || item.description} /
                    </Typography>
                    <Typography>
                      {item.order_qty} {item.unit_uom}
                    </Typography>
                  </div>
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
