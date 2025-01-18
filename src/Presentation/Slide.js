import { useEffect, useState } from "react";
import HIPAACertificate from "../Hipaa/Certificate";
import HIPAAConclusion from "../Hipaa/Conclusion";
import HIPAAHealthInfoProtected from "../Hipaa/HealthInformation";
import HIPAAIntroduction from "../Hipaa/Introduction";
import HIPAAObjectives from "../Hipaa/Objective";
import HIPAAPatientConsent from "../Hipaa/PatientConsent";
import HIPAAPracticalImplications from "../Hipaa/PracticalImplication";
import HIPAAPurpose from "../Hipaa/Purpose";
import HIPAAQuiz from "../Hipaa/Quiz";

import HIPAAResearch from "../Hipaa/Research";
import HIPAAInfo from "../Hipaa/Undestanding";
import HIPAAWhyIsNeeded from "../Hipaa/WhyHipaaIsNeeded";

const { Grid } = require("@mui/material");

const SlidePage = (props) => {
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
      <div style={{ background: "white" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={12} sm={12}>
            <div
              style={{
                width: !isMobile ? "98%" : "98%",
              }}
            >
              <div>
                {/* HIPAA SEQUENCE */}
                {props.seq === 0 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAPurpose />
                ) : props.seq === 1 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAObjectives />
                ) : props.seq === 2 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAIntroduction />
                ) : props.seq === 3 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAWhyIsNeeded />
                ) : props.seq === 4 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAInfo />
                ) : props.seq === 5 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAHealthInfoProtected />
                ) : props.seq === 6 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAPatientConsent />
                ) : props.seq === 7 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAPracticalImplications />
                ) : props.seq === 8 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAResearch />
                ) : props.seq === 9 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAConclusion />
                ) : props.seq === 10 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAAQuiz
                    collectAnswerHandler={props.collectAnswerHandler}
                  />
                ) : props.seq === 11 && props.inservices?.topic === "HIPAA" ? (
                  <HIPAACertificate />
                ) : null}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SlidePage;
