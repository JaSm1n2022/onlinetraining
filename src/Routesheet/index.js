import { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { useToasts } from "react-toast-notifications";
import ReactSignatureCanvas from "react-signature-canvas";

import {
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import { ACTION_STATUSES, CLIENT_SERVICES } from "../utils/constants";

import {
  attemptToCreateProof,
  resetCreateProofState,
} from "../store/actions/proofAction";
import { SupaContext } from "../App";
import Base from "../Base";

import RegularDatePicker from "../Component/RegularDatePicker";
import dayjs from "dayjs";
import RegularTimePicker from "../Component/RegularTimePicker";
import SortUtil from "../utils/sortUtil";
import { routesheetCreateStateSelector } from "../store/selectors/routesheetSelector";
import { assignmentListStateSelector } from "../store/selectors/assignmentSelector";
import {
  attemptToFetchAssignment,
  resetFetchAssignmentState,
} from "../store/actions/assignmentAction";
import {
  attemptToCreateRoutesheet,
  resetCreateRoutesheetState,
} from "../store/actions/routesheetAction";

let serviceList = [];
let dataSource = [];
const Routesheet = (props) => {
  const sigCanvas = useRef();
  const context = useContext(SupaContext);
  const { addToast } = useToasts();

  const [client, setClient] = useState("Select");
  const [clients, setClients] = useState([]);
  const [clientService, setClientService] = useState("Regular Visit");
  const [isRefresh, setIsRefresh] = useState(false);

  const [isAssignmentCollection, setIsAssignmentCollection] = useState(true);
  const [isRoutesheetCollection, setIsRoutesheetCollection] = useState(true);
  const [isProcessDone, setIsProcessDone] = useState(false);
  const [dos, setDos] = useState(dayjs(new Date()));
  const [timeIn, setTimeIn] = useState(dayjs(new Date()));
  const [timeOut, setTimeOut] = useState(dayjs(new Date()));

  useEffect(() => {
    serviceList = SortUtil.sortByAsc(CLIENT_SERVICES, "name", false);
  }, []);
  useEffect(() => {
    if (
      !isAssignmentCollection &&
      props.assignmentState?.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetListAssignment();
      setIsAssignmentCollection(true);
      const arr = props.assignmentState?.data || [];
      dataSource = arr.filter(
        (a) =>
          context.employeeProfile.id === a.cnaId ||
          context.employeeProfile.id === a.rnaId
      );

      const uniqueList = Array.from(
        new Set(arr?.map((m) => m.patientCd) || [])
      );

      setClients(uniqueList);
      if (uniqueList?.length === 1) {
        setClient(uniqueList[0]);
      }
    }
    if (
      !isRoutesheetCollection &&
      props.createRoutesheetState?.status === ACTION_STATUSES.SUCCEED
    ) {
      addToast("Successfully saved. ", {
        appearance: "success",
        autoDismiss: true,
      });
      props.resetCreateRoutesheet();
      setIsRoutesheetCollection(true);
      clearHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssignmentCollection, isRoutesheetCollection]);
  useEffect(() => {
    const emp = context.employeeProfile;

    if (emp?.id) {
      setIsProcessDone(false);

      props.listAssignments({ companyId: emp.companyId });
    } else {
      props.history.push(`/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const onBeginHandler = () => {
    setIsRefresh(!isRefresh);
  };
  const clearSignatureHandler = () => {
    sigCanvas.current?.clear();
    setIsRefresh(!isRefresh);
  };
  const clearHandler = () => {
    //clear
    setClient("Select");
    if (clients?.length === 1) {
      setClient(clients[0]);
    }
    setClientService("Regular Visit");
    sigCanvas.current?.clear();
    setDos(dayjs(new Date()));
    setTimeIn(dayjs(new Date()));
    setTimeOut(dayjs(new Date()));
  };

  const inputHandler = ({ target }) => {
    console.log("[Target Name]", target.name);
    if (target.name === "client") {
      setClient(target.value);
    } else if (target.name === "clientService") {
      setClientService(target.value);
    }
  };

  const saveHandler = () => {
    console.log("[TIME IN/OUT]", timeIn, timeOut, dos);
    const signImg = sigCanvas.current?.getCanvas().toDataURL("image/png");

    const params = {
      created_at: new Date(),
      companyId: context.userProfile.companyId,
      updatedUser: {
        name: context.userProfile.name,
        userId: context.userProfile.id,
        date: new Date(),
      },
      createdUser: {
        name: context.userProfile.name,
        userId: context.userProfile.id,
        date: new Date(),
      },
      signature_based: signImg,
      timeIn: dayjs(timeIn.$d).format("HH:mm"),
      timeOut: dayjs(timeOut.$d).format("HH:mm"),
      requestor: context.employeeProfile.name,
      requestorId: context.employeeProfile.id,
      requestorTitle: context.employeeProfile.position,

      dos: dayjs(dos.$d).format("YYYY-MM-DD"),
    };
    const serviceInfo = serviceList.find((f) => f.name === clientService);
    params.service = serviceInfo?.name || "";
    params.serviceCd = serviceInfo?.code || "";
    params.patientCd = client;
    props.createRoutesheet(params);
    console.log("[Params]", params);
  };

  const refreshHandler = () => {
    clearHandler();
    setIsProcessDone(false);
  };
  const dateInputHandler = (name, value) => {
    if (name === "dos") {
      setDos(value);
    }
  };
  const timeInputHandler = (name, value) => {
    if (name === "timeIn") {
      setTimeIn(value);
    } else if (name === "timeOut") {
      setTimeOut(value);
    }
  };
  if (
    isAssignmentCollection &&
    props.assignmentState?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsAssignmentCollection(false);
  }
  if (
    isRoutesheetCollection &&
    props.createRoutesheetState?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsRoutesheetCollection(false);
  }
  return (
    <>
      <div
        style={{
          background: "#56764c",
          width: !context.isMobile ? "50%" : "100%",
          paddingLeft: !context.isMobile ? "25%" : "0%",
          paddingRight: !context.isMobile ? "25%" : "0%",
        }}
      >
        {" "}
        <Base refreshHandler={refreshHandler} />
        <div style={{ paddingLeft: 16, paddingBottom: 4, paddingRight: 16 }}>
          <Typography
            style={{ color: "white", background: "#033D39" }}
            variant="h6"
          >
            Routesheet
          </Typography>
        </div>
        <div align="left" style={{ paddingLeft: 16, paddingBottom: 4 }}>
          <Typography style={{ color: "white" }} variant="h6">
            {`Select Client ${clients?.length ? `(${clients.length})` : ""}`}
          </Typography>
        </div>
        <div align="left" style={{ paddingRight: 16, paddingLeft: 16 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="client-select-label"
                id="client-select-select"
                value={client}
                name="client"
                style={{ background: "white" }}
                onChange={inputHandler}
              >
                <MenuItem disabled value="Select">
                  Select One
                </MenuItem>
                {clients.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        {clients?.length === 0 && isProcessDone && (
          <div
            style={{
              width: "100%",
            }}
          >
            <div align="left" style={{ paddingLeft: 16, paddingTop: 5 }}>
              <Typography style={{ color: "white" }} variant="h6">
                There are currently no supplies available for client delivery.
                Please refresh the page to check for any available supplies.
              </Typography>
            </div>
          </div>
        )}
        <div
          align="left"
          style={{
            display: client && client !== "Select" ? "" : "none",
            paddingLeft: 16,
            paddingBottom: 4,
          }}
        >
          <Typography style={{ color: "white" }} variant="h6">
            {`Select Service`}
          </Typography>
        </div>
        <div
          align="left"
          style={{
            display: client && client !== "Select" ? "" : "none",
            paddingRight: 16,
            paddingLeft: 16,
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="clientService-select-label"
                id="clientService-select-select"
                value={clientService}
                name="clientService"
                style={{ background: "white" }}
                onChange={inputHandler}
              >
                <MenuItem disabled value="Select">
                  Select One
                </MenuItem>
                {serviceList.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div
          align="left"
          style={{
            display:
              client &&
              client !== "Select" &&
              clientService &&
              clientService !== "Select"
                ? ""
                : "none",
            paddingLeft: 16,
            paddingBottom: 4,
            paddingRight: 16,
          }}
        >
          <Grid container spacing={1} direction="row">
            <Grid item xs={12} md={4} sm={12}>
              <div>
                <Typography style={{ color: "white" }} variant="h6">
                  {`Date of Service`}
                </Typography>
                <RegularDatePicker
                  name="dos"
                  value={dos || dayjs(new Date())}
                  onChange={dateInputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <div>
                <Typography style={{ color: "white" }} variant="h6">
                  {`Time In`}
                </Typography>
                <RegularTimePicker
                  value={timeIn || dayjs(new Date())}
                  name="timeIn"
                  onChange={timeInputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <div>
                <Typography style={{ color: "white" }} variant="h6">
                  {`Time Out`}
                </Typography>
                <RegularTimePicker
                  value={timeOut || dayjs(new Date())}
                  name="timeOut"
                  onChange={timeInputHandler}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: "100%",
            display:
              client &&
              client !== "Select" &&
              clientService &&
              clientService !== "Select"
                ? ""
                : "none",
          }}
        >
          <div align="left" style={{ paddingLeft: 16, paddingTop: 5 }}>
            <Typography style={{ color: "white" }} variant="h6">
              Signature
            </Typography>
          </div>
          <div
            align="left"
            style={{
              border: "4px solid white",
              background: "white",
              marginLeft: 16,
              marginRight: 16,
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
          <div align="left" style={{ paddingLeft: 16, paddingTop: 5 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearSignatureHandler}
            >
              Clear
            </Button>
          </div>
          <div
            style={{ paddingTop: 5, paddingLeft: "25%", paddingRight: "25%" }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              width="200px"
              onClick={() => saveHandler()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (store) => ({
  createRoutesheetState: routesheetCreateStateSelector(store),
  assignmentState: assignmentListStateSelector(store),
});
const mapDispatchToProps = (dispatch) => ({
  createRoutesheet: (data) => dispatch(attemptToCreateRoutesheet(data)),
  resetCreateRoutesheet: () => dispatch(resetCreateRoutesheetState()),
  listAssignments: (data) => dispatch(attemptToFetchAssignment(data)),
  resetListAssignment: () => dispatch(resetFetchAssignmentState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Routesheet);
