import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import logo from "../assets/haloeslogo.png";
import address from "../assets/haloestouchaddress.png";
import { ACTION_STATUSES } from "../utils/constants";
import { supabaseClient } from "../config/SupabaseClient";
const { Typography, TextField, Button, Grid } = require("@mui/material");

const Login = (props) => {
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isKeyCollection, setIsKeyCollection] = useState(true);
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

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithOtp({ email });

      if (error) throw error;

      addToast("Please check your email", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.log("[error login]", error.toString());
      addToast("Failed to sign in", { appearance: "error", autoDismiss: true });
    } finally {
      const user = supabaseClient.auth.getUser();
      setLoading(false);
      if (user) {
        console.log("user->>>", user);
      }
    }
  };
  const changeInputHandler = ({ target }) => {
    console.log("[TARGE}", target);
    setEmail(target.value);
    if (target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  if (isKeyCollection && props.keys?.status === ACTION_STATUSES.SUCCEED) {
    setIsKeyCollection(false);
  }
  if (props.updateKeyState?.status === ACTION_STATUSES.SUCCEED) {
    props.resetUpdateKey();
  }
  return (
    <>
      <div align="center" style={{ paddingTop: 50 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={12} sm={12} style={{ paddingTop: 10 }}>
            {!isMobile ? (
              <img src={logo} alt="" width="30%" />
            ) : (
              <img src={logo} alt="" width="80%" />
            )}
          </Grid>

          <Grid item md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <Typography
                variant="h5"
                alignText="center"
                style={{ color: "white" }}
              >
                Sign In Using a Magiclink
              </Typography>
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
          <Grid item xs={12} md={12} sm={12}>
            <div style={{ width: !isMobile ? "600px" : "98%" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", fontSize: "14pt" }}
                onClick={() => handleLogin()}
              >
                Submit
              </Button>{" "}
            </div>
          </Grid>
          <Grid item xs={12} md={12} sm={12} style={{ paddingTop: 20 }}>
            <Typography variant="h5" style={{ color: "white" }}>
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} sm={12} style={{ paddingTop: 0 }}>
            {!isMobile ? (
              <img src={address} alt="" width="30%" />
            ) : (
              <img src={address} alt="" width="80%" />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
