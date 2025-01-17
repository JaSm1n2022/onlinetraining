import { useEffect, useState } from "react";
import { supabaseClient } from "./config/SupabaseClient";
import {
  DefaultToastContainer,
  ToastProvider,
} from "react-toast-notifications";
import "./App.css";
//  import Home from "./Home";
import Login from "./Login";
import Pickup from "./Pickup";
import Delivery from "./Delivery";
import { connect } from "react-redux";
import { profileListStateSelector } from "./store/selectors/profileSelector";
import {
  attemptToFetchProfile,
  resetFetchProfileState,
} from "./store/actions/profileAction";
import { ACTION_STATUSES } from "./utils/constants";
import { employeeListStateSelector } from "./store/selectors/employeeSelector";
import {
  attemptToFetchEmployee,
  resetFetchEmployeeState,
} from "./store/actions/employeeAction";
import ErrorPage from "./Error";
import { CircularProgress } from "@mui/material";
import { Switch, Route } from "react-router-dom";
import React from "react";
import Routesheet from "./Routesheet";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export const CustomToastContainer = (props) => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);
let isProcessDone = false;
export const SupaContext = React.createContext();
function App(props) {
  const [session, setSession] = useState(null);
  const [signedIn, setSignedIn] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  const [userProfile, setUserProfile] = useState(undefined);
  const [employeeProfile, setEmployeeProfile] = useState(undefined);
  const [isEmployeeCollection, setIsEmployeeCollection] = useState(true);
  const [isProfileCollection, setIsProfileCollection] = useState(true);
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
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    });
  }, []);
  useEffect(() => {
    //	props.onTryAutoSignup();
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        //  setRequestor(session.user.email);
        if (session) {
          props.fetchProfile({ email: session.user.email });
        } else {
          setSignedIn(false);
        }
        //    setSignedIn(true);
      }
    });
  }, [session]);
  useEffect(() => {
    if (
      !isProfileCollection &&
      props.profileState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetProfiles();

      const profile = props.profileState?.data.length
        ? props.profileState?.data[0]
        : undefined;
      console.log("[User Profile]", userProfile);
      if (profile) {
        props.listEmployee({
          email: profile.username,
          companyId: profile.companyId,
        });
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
      setUserProfile(profile);
      setIsProfileCollection(true);
    }
    if (
      !isEmployeeCollection &&
      props.employeeState.status === ACTION_STATUSES.SUCCEED
    ) {
      const employee = props.employeeState.data?.length
        ? props.employeeState.data[0]
        : undefined;
      isProcessDone = true;

      setEmployeeProfile(employee);
      props.resetListEmployee();
    }
  }, [isProfileCollection, isEmployeeCollection]);
  if (
    isProfileCollection &&
    props.profileState &&
    props.profileState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsProfileCollection(false);
  }
  if (
    isEmployeeCollection &&
    props.employeeState &&
    props.employeeState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsEmployeeCollection(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SupaContext.Provider value={{ userProfile, employeeProfile, isMobile }}>
        <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
          <div className="back-img">
            {" "}
            <Switch>
              <Route path="/pickup" component={Pickup} />
              <Route path="/delivery" component={Delivery} />
              <Route path="/routesheet" component={Routesheet} />
              {!signedIn ? (
                <Login />
              ) : employeeProfile ? (
                <Delivery />
              ) : isProcessDone ? (
                <ErrorPage userProfile={userProfile} />
              ) : (
                <div align="center" style={{ color: "white" }}>
                  <CircularProgress />
                  Loading...
                </div>
              )}
            </Switch>
          </div>
        </ToastProvider>
      </SupaContext.Provider>
    </LocalizationProvider>
  );
}

const mapStateToProps = (store) => ({
  profileState: profileListStateSelector(store),
  employeeState: employeeListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (data) => dispatch(attemptToFetchProfile(data)),
  resetProfiles: () => dispatch(resetFetchProfileState()),
  listEmployee: (data) => dispatch(attemptToFetchEmployee(data)),
  resetListEmployee: () => dispatch(resetFetchEmployeeState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
