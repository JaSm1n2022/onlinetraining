/* eslint-disable jsx-a11y/alt-text */
import { Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/haloeslogo.png";
import ReactSignatureCanvas from "react-signature-canvas";
const EventAttendanceForm = (props) => {
  const sigCanvas = useRef();
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    phone: "",
    signature: "",
  });
  const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onBeginHandler = () => {
    setIsSigned(true);
  };
  const clearSignatureHandler = () => {
    sigCanvas.current?.clear();
    setIsSigned(false);
  };

  const isConfirmDisabledHandler = () => {
    if (!isSigned) {
      return true;
    }
    return false;
  };

  const confirmAttendanceHandler = () => {
    const signImg = sigCanvas.current?.getCanvas().toDataURL("image/png");
    console.log("[Saved Image]", signImg);
    props.history.push(`/presentation?cd=12345`);
  };
  return (
    <div style={{ background: "white" }}>
      <Grid container direction="row" spacing={2}>
        <Grid item md={12} sm={12}>
          <div
            style={{
              background: "#56764c",
              width: !isMobile ? "90%" : "98%",
            }}
          >
            <Grid container justifyContent="space-between">
              <div style={{ paddingLeft: 10 }}>
                <Typography variant="h5" style={{ color: "white" }}>
                  {"HIPAA Compliance"}
                </Typography>
                <div style={{ paddingLeft: 10 }}>
                  <Typography variant="body2" style={{ color: "white" }}>
                    In-service Training
                  </Typography>
                </div>
              </div>
              <img src={logo} width="200px" height="60px" />
            </Grid>
          </div>
        </Grid>
        <Grid item md={12} sm={12}>
          <div className="form-container">
            <h2>Event Attendance Confirmation Form</h2>
            <p>
              <strong>Event Name:</strong> In-Service for HIPAA Compliance
              Training Program
            </p>
            <p>
              <strong>Date:</strong> {currentDate}
            </p>

            <p>
              <strong>Venue:</strong> Online In-Service
            </p>

            <div>
              <div>
                <label>Full Name: Nargel Velasco</label>
              </div>
              <div>
                <label>Position: Administrative Volunteer</label>
              </div>
              <div>
                <label>Phone: 925-876-7917</label>
              </div>

              <div align="left" style={{ paddingTop: 5 }}>
                <Typography style={{ color: "black" }} variant="body">
                  Signature
                </Typography>
              </div>
              <div
                align="left"
                style={{
                  border: "1px solid black",
                  background: "white",
                  width: "300px",
                }}
              >
                <ReactSignatureCanvas
                  penColor="green"
                  onBegin={(e) => onBeginHandler(e)}
                  ref={(ref) => {
                    sigCanvas.current = ref;
                  }}
                  canvasProps={{
                    height: 80,
                    width: 300,
                    background: "white",
                    className: "sigCanvas",
                  }}
                />
              </div>
              <div align="left" style={{ paddingTop: 5 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={clearSignatureHandler}
                >
                  Clear
                </Button>
              </div>

              <p>
                I, the undersigned, confirm my attendance at the above-mentioned
                event. I understand the importance of my participation and will
                make every effort to be present.
              </p>

              <p>
                <strong>Terms and Conditions:</strong> By confirming my
                attendance, I agree to abide by the rules and regulations set
                forth by the organizers for the smooth conduct of the event.
              </p>

              <Button
                variant="contained"
                color="primary"
                disabled={!isSigned}
                onClick={() => confirmAttendanceHandler()}
              >
                Confirm Attendance
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventAttendanceForm;
