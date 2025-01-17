import { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import logo from "../assets/haloeslogo.png";
import Pod from "../Pod";
import { Link } from "react-router-dom";
import {
  Book,
  CameraAlt,
  Download,
  LocalShipping,
  MoreVert,
  RefreshOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ListItemText,
  MenuItem,
  IconButton,
  Menu,
  Divider,
  Typography,
} from "@mui/material";

import { SupaContext } from "../App";

const Base = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(SupaContext);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const refreshHandler = () => {
    if (props.refreshHandler) {
      props.refreshHandler();
    } else {
      window.location.reload();
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const readingMaterialsHandler = () => {
    window.open(process.env.REACT_APP_DOWNLOAD_READING_MATERIAL);
  };
  const employeeHandbookHandler = () => {
    window.open(process.env.REACT_APP_DOWNLOAD_EMPLOYEE_HANDBOOK);
  };
  const routesheetHandler = () => {
    window.open(process.env.REACT_APP_DOWNLOAD_ROUTESHEET);
  };

  return (
    <>
      <div
        style={{
          display: "inline-flex",
          width: "100%",
          gap: !context.isMobile ? "50%" : "35%",
          paddingLeft: 16,
          paddingTop: 10,
          paddingRight: 16,
        }}
      >
        <img
          src={logo}
          alt=""
          height={!context.isMobile ? "90px" : "70px"}
          width={!context.isMobile ? "40%" : "50%"}
        />
        <div>
          <IconButton
            disableRipple
            style={{ background: "none" }}
            onClick={handleClick}
          >
            <MenuIcon fontSize="large" style={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
            style={{ border: "1px solid #d3d4d5" }}
            elevation={1}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <Typography variant="body">Actions</Typography>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <div
                  style={{ display: "inline-flex", gap: 4 }}
                  onClick={() => refreshHandler()}
                >
                  <RefreshOutlined />
                  <Typography variant="body">Refresh Page</Typography>
                </div>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <Link to="/pickup">
                  <div
                    style={{ display: "inline-flex", gap: 8, color: "black" }}
                  >
                    <LocalShipping />
                    <Typography variant="body">Pickup</Typography>
                  </div>
                </Link>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <Link to="/delivery">
                  <div
                    style={{ display: "inline-flex", gap: 8, color: "black" }}
                  >
                    <LocalShipping />
                    <Typography variant="body">Delivery</Typography>
                  </div>
                </Link>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            {/*
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <Link to="/routesheet">
                  <div
                    style={{ display: "inline-flex", gap: 8, color: "black" }}
                  >
                    <LocalShipping />
                    <Typography variant="body">Routesheet</Typography>
                  </div>
                </Link>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            */}
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <div
                  style={{ display: "inline-flex", gap: 4 }}
                  onClick={() => employeeHandbookHandler()}
                >
                  <Book />
                  <Typography variant="body">Employee Handbook</Typography>
                </div>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <div
                  style={{ display: "inline-flex", gap: 4 }}
                  onClick={() => readingMaterialsHandler()}
                >
                  <Download />
                  <Typography variant="body">Reading Materials</Typography>
                </div>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <div
                  style={{ display: "inline-flex", gap: 4 }}
                  onClick={() => routesheetHandler()}
                >
                  <Download />
                  <Typography variant="body">Routesheet</Typography>
                </div>
              </ListItemText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemText>
                <Link to="/routesheet">
                  <div
                    style={{ display: "inline-flex", gap: 8, color: "black" }}
                  >
                    <LocalShipping />
                    <Typography variant="body">Route In/Out</Typography>
                  </div>
                </Link>
              </ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Base;
