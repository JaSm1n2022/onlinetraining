import { useEffect, useState } from "react";
import logo from "../assets/haloeslogo.png";
import address from "../assets/haloestouchaddress.png";

const { Typography, Grid } = require("@mui/material");

const ErrorPage = (props) => {
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
                {`Your user login account ${
                  props.userProfile?.username ? props.userProfile?.username : ""
                } is no longer associated with this
                company or is not the correct account. Please contact support
                for assistance.`}
              </Typography>
            </div>
          </Grid>

          <Grid item md={12} sm={12} style={{ paddingTop: 10 }} align="center">
            {!isMobile ? (
              <img src={address} alt="" width="30%" />
            ) : (
              <img src={address} alt="" width="80%" height="100px" />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ErrorPage;
