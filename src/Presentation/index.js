/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import logo from "../assets/haloeslogo.png";
import address from "../assets/haloestouchaddress.png";
import QuizModal from "../Hipaa/QuizModal";
import style from "./style.module.css";
import {
  attemptToFetchEmployee,
  resetFetchEmployeeState,
} from "../store/actions/employeeAction";
import { employeeListStateSelector } from "../store/selectors/employeeSelector";
import { HIPAA_QUIZ_ANSWER, IN_SERVICES } from "../utils/constants";
import SlidePage from "./Slide";
import { useRef } from "react";
import RegularSelect from "../Component/RegularSelect";

let correctScore = 0;

const { Typography, Grid, Button } = require("@mui/material");

const PresentationPage = (props) => {
  const scrollRef = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [topic, setTopic] = useState({});
  const [topics, setTopics] = useState([]);
  const [seq, setSeq] = useState(0);
  const [currentSeq, setCurrentSeq] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollbar = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
      setIsScrollbarVisible(scrollHeight > clientHeight);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    }
  };

  useEffect(() => {
    checkScrollbar(); // Check on mount
    window.addEventListener("resize", checkScrollbar); // Recheck on window resize

    return () => {
      window.removeEventListener("resize", checkScrollbar);
    };
  }, []);
  useEffect(() => {
    checkScrollbar(); // Check on mount
    window.addEventListener("resize", checkScrollbar); // Recheck on window resize

    return () => {
      window.removeEventListener("resize", checkScrollbar);
    };
  }, [seq]);

  useEffect(() => {
    const t = IN_SERVICES.find((f) => f.seq === seq && f.topic === "HIPAA");
    const ts = IN_SERVICES.filter((f) => f.topic === "HIPAA");
    setTopics(ts);
    setTopic(t);
  }, [seq]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Set scroll to top
    }
  }, []);
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
  const nextSeqHandler = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      setIsScrollbarVisible(scrollHeight > clientHeight);
      setIsAtBottom(false);
      scrollRef.current.scrollTop = 0;
    }
    if (seq === 10 && topic.topic === "HIPAA" && answers?.length === 20) {
      // calculate answers
      correctScore = 0;
      answers.forEach((a, indx) => {
        const ans = HIPAA_QUIZ_ANSWER.find((f) => f.q === indx + 1);
        if (a === ans.a) {
          correctScore++;
        }
      });
      // update seq of employee
      correctScore = parseInt((correctScore / 20) * 100);
      setShowScore(true);
    } else {
      setSeq(seq + 1);
      setCurrentSeq(seq + 1);
    }
  };
  const prevSeqHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    if (seq >= 1) {
      setSeq(seq - 1);
    }
  };
  const downloadCertificateHandler = () => {
    setShowScore(false);
    setSeq(seq + 1);
    setCurrentSeq(seq + 1);
  };
  const topicHandler = (key) => {
    setSeq(key);
  };
  const collectAnswerHandler = (quizList) => {
    console.log("[ANSWERS]", quizList);
    const finalList = [];
    for (let i = 0; i < quizList.length; i++) {
      if (quizList[i]) {
        finalList.push(quizList[i]);
      }
    }
    setAnswers(finalList);
  };
  const isNextDisabledHandler = () => {
    console.log(
      "[IS NEXT DISABLED]",
      isAtBottom,
      isScrollbarVisible,
      seq,
      topic,
      answers
    );
    if (seq === 10 && topic.topic === "HIPAA" && answers?.length !== 20) {
      return true;
    }

    if (seq === 10 && topic.topic === "HIPAA" && answers?.length === 20) {
      return false;
    }
    if (seq === 11 && topic.topic === "HIPAA") {
      return true;
    }
    if (!isAtBottom && isScrollbarVisible) {
      return true;
    }

    return false;
  };
  return (
    <>
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
                  <div style={{ paddingLeft: 4 }}>
                    <Typography variant="body2" style={{ color: "white" }}>
                      In-Service Training (Due Date January 31, 2025)
                    </Typography>
                  </div>
                </div>
                <img src={logo} width="200px" height="60px" />
              </Grid>
            </div>
          </Grid>
          <Grid item md={12} sm={12}>
            <div
              style={{
                width: !isMobile ? "90%" : "98%",
              }}
              align="right"
            >
              <div style={{ display: "inline-flex", gap: 10 }}>
                <Typography variant="body2">Select Topic</Typography>
                <RegularSelect
                  seq={seq}
                  currentSeq={currentSeq}
                  title={"Topic"}
                  width={500}
                  options={topics}
                  onChangeHandler={topicHandler}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={12} sm={12}>
            <div
              className={style.scrollContainer}
              onScroll={checkScrollbar}
              style={{
                width: !isMobile ? "90%" : "98%",
              }}
              ref={scrollRef}
            >
              <SlidePage
                inservices={topic}
                seq={seq}
                collectAnswerHandler={collectAnswerHandler}
              />
            </div>
          </Grid>
          <Grid item md={12} sm={12}>
            <div
              style={{
                width: !isMobile ? "98%" : "98%",
              }}
            >
              <div
                style={{ display: seq >= 0 ? "inline-flex" : "none", gap: 100 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => prevSeqHandler()}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={() => nextSeqHandler()}
                  disabled={isNextDisabledHandler()}
                >
                  Next
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        {showScore && (
          <QuizModal
            score={correctScore}
            isOpen={showScore}
            downloadCertificateHandler={downloadCertificateHandler}
            onCloseHandler={() => setShowScore(false)}
          />
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(PresentationPage);
