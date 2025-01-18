import { useEffect, useState } from "react";
import { supabaseClient } from "./config/SupabaseClient";
import {
  DefaultToastContainer,
  ToastProvider,
} from "react-toast-notifications";
import "./App.css";
//  import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WelcomePage from "./Welcome";
import PresentationPage from "./Presentation";
import AttendancePage from "./Attendance";
export const CustomToastContainer = (props) => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

export const SupaContext = React.createContext();
function App(props) {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SupaContext.Provider value={{ isMobile }}>
        <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
          <div>
            {" "}
            <Switch>
              <Route path="/presentation" component={PresentationPage} />
              <Route path="/attendance" component={AttendancePage} />
              <Route path="/" component={WelcomePage} />
            </Switch>
          </div>
        </ToastProvider>
      </SupaContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
