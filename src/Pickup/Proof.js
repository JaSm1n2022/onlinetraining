import { CameraAlt, FlipCameraAndroid } from "@mui/icons-material";
import { Button, Grid, Tooltip } from "@mui/material";

import React, { useState } from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER,
};
const Proof = (props) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isRetake, setIsRetake] = useState(false);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsRetake(!isRetake);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  const retakeHandler = () => {
    setIsRetake(!isRetake);
  };
  const usePhotoHandler = () => {
    props.onUsePhotoHandler(imgSrc);
  };
  return (
    <>
      {!isRetake && (
        <>
          <Grid container justifyContent="space-between">
            <div
              style={{
                display: "inline-flex",
                gap: 6,
                paddingBottom: 4,
                paddingTop: 4,
              }}
            >
              <Tooltip title="Take a picture">
                <CameraAlt
                  onClick={capture}
                  style={{ fontSize: "32pt", color: "green" }}
                />
              </Tooltip>
              <Tooltip title="Flip a camera">
                <FlipCameraAndroid
                  style={{ fontSize: "32pt" }}
                  onClick={handleClick}
                />
              </Tooltip>
            </div>
          </Grid>
          <div>
            <Webcam
              audio={false}
              muted={true}
              ref={webcamRef}
              style={{
                textAlign: "center",
                zindex: 8,
                right: 0,
                height: "20vh",
                width: props.isMobile ? "100%" : "50%",

                objectFit: "fill",
              }}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                ...videoConstraints,
                facingMode,
              }}
            />
          </div>
        </>
      )}
      {imgSrc && isRetake && (
        <img
          src={imgSrc}
          alt=""
          width={props.isMobile ? "90%" : "40%"}
          // height={props.isMobile ? "80%" : "50%"}
        />
      )}
      {isRetake && (
        <Grid container>
          <div
            style={{
              display: "inline-flex",
              gap: 4,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={usePhotoHandler}
            >
              Use Photo
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => retakeHandler()}
              color="secondary"
            >
              Retake
            </Button>
          </div>
        </Grid>
      )}
    </>
  );
};
export default Proof;
