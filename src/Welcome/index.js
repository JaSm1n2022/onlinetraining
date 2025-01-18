import { useEffect, useState } from "react";
import { connect } from "react-redux";
import logo from "../assets/haloeslogo.png";

import {
  attemptToFetchEmployee,
  resetFetchEmployeeState,
} from "../store/actions/employeeAction";
import { employeeListStateSelector } from "../store/selectors/employeeSelector";

const { Typography, Grid, TextField, Button } = require("@mui/material");

const WelcomePage = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [trainingCode, setTrainingCode] = useState("");
  const [trainingCodeError, setTrainingCodeError] = useState(false);
  const [isPresentation, setIsPresentation] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      // remove event listener when the component is unmounted to not cause any memory leaks
      // otherwise the event listener will continue to be active
      window.removeEventListener("resize", handleResize);
    };
    // add `isMobile` state variable as a dependency so that
    // it is called every time the window is resized
  }, [isMobile]);
  const changeInputHandler = ({ target }) => {
    console.log("[TARGE}", target);
    setEmail(target.value);
    if (target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handleWelcome = () => {
    setIsPresentation(true);
    props.history.push(`/attendance`);
  };
  return (
    <>
      <div align="center" style={{ paddingTop: 50 }} className="back-img">
        <Grid container direction="row" spacing={2}>
          <Grid item md={12} sm={12} style={{ paddingTop: 10 }}>
            {!isMobile ? (
              <img src={logo} alt="" width="30%" />
            ) : (
              <img src={logo} alt="" width="80%" />
            )}
          </Grid>

          <Grid item md={12} sm={12}>
            <div
              style={{
                width: !isMobile ? "600px" : "98%",
              }}
            >
              <Typography
                variant="h6"
                alignText="center"
                style={{ color: "white" }}
              >
                {"Welcome to Haloes Touch Online Inservice Training"}
              </Typography>
            </div>
          </Grid>
          <Grid item md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <Typography variant="body" style={{ color: "white" }}>
                Please provide your email address to register.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <TextField
                required
                value={email}
                name="email"
                type="email"
                placeholder="Email Address"
                error={emailError}
                onChange={changeInputHandler}
                helperText={emailError ? "Please enter a valid email" : ""}
                inputProps={{
                  type: "email",
                }}
                style={{
                  fontSize: "14pt",
                  width: "90%",
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </Grid>
          <Grid item md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <Typography variant="body" style={{ color: "white" }}>
                Please provide your in-service training code.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <TextField
                required
                value={trainingCode}
                name="Training Code"
                type="Training Code"
                placeholder="Training Code"
                error={trainingCodeError}
                onChange={changeInputHandler}
                helperText={
                  trainingCodeError ? "Please enter a valid code" : ""
                }
                inputProps={{
                  type: "text",
                }}
                style={{
                  fontSize: "14pt",
                  width: "90%",
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", fontSize: "14pt" }}
                onClick={() => handleWelcome()}
              >
                Submit
              </Button>{" "}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = (store) => ({
  employeeState: employeeListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listEmployee: (data) => dispatch(attemptToFetchEmployee(data)),
  resetListEmployee: () => dispatch(resetFetchEmployeeState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
