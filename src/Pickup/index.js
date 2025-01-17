import { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import Pod from "../Pod";
import { CameraAlt } from "@mui/icons-material";

import { useToasts } from "react-toast-notifications";
import ReactSignatureCanvas from "react-signature-canvas";
import PhotoModal from "./PhotoModal";
import {
  Button,
  Typography,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  distributionListStateSelector,
  distributionUpdateStateSelector,
} from "../store/selectors/distributionSelector";
import {
  attemptToFetchDistribution,
  attemptToUpdateDistribution,
  resetFetchDistributionState,
  resetUpdateDistributionState,
} from "../store/actions/distributionAction";
import { ACTION_STATUSES } from "../utils/constants";
import { proofCreateStateSelector } from "../store/selectors/proofSelector";
import {
  attemptToCreateProof,
  resetCreateProofState,
} from "../store/actions/proofAction";
import { SupaContext } from "../App";

import Base from "../Base";
let originalSource = [];

const Pickup = (props) => {
  const sigCanvas = useRef();
  const context = useContext(SupaContext);
  const { addToast } = useToasts();

  const [imgSrc, setImgSrc] = useState("");
  const [client, setClient] = useState("Select");
  const [clients, setClients] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [printedName, setPrintedName] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isProofCollection, setIsProofCollection] = useState(true);
  const [isProcessDone, setIsProcessDone] = useState(false);
  const [isUpdateDistributionCollection, setIsUpdateDistributionCollection] =
    useState(true);
  const [isDistributionCollection, setIsDistributionCollection] =
    useState(true);

  useEffect(() => {
    const emp = context.employeeProfile;

    if (emp?.id) {
      console.log("[Props employee1]", emp.id);
      setIsProcessDone(false);
      props.listDistributions({
        requestor: emp.id,
        isPickup: true,

        companyId: emp.companyId,
      });
    } else {
      props.history.push(`/`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);
  useEffect(() => {
    if (
      !isDistributionCollection &&
      props.distributions?.status === ACTION_STATUSES.SUCCEED
    ) {
      const data = props.distributions?.data?.filter(
        (f) => f.category === "Medical/Incontinence"
      );
      console.log("[Data]", data);
      originalSource = data || [];

      const arr = Array.from(new Set(data?.map((m) => m.patientCd) || []));
      setClients(arr);
      setDataSource(data);
      setIsProcessDone(true);
      props.resetListDistributions();
      setIsDistributionCollection(true);
    }
    if (
      !isProofCollection &&
      props.proofState &&
      props.proofState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetCreateProof();
      const finalPayload = [];
      dataSource.forEach((d) => {
        finalPayload.push({
          id: d.id,
          actualPickupDt: new Date(),
          updatedUser: {
            name: context.userProfile.name,
            userId: context.userProfile.id,
            date: new Date(),
          },
        });
      });
      props.updateDistribution(finalPayload);
      setIsProofCollection(true);
    }
    if (
      !isUpdateDistributionCollection &&
      props.updateDistributionState &&
      props.updateDistributionState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetUpdateDistribution();
      clearHandler();
      addToast("Successfully saved. ", {
        appearance: "success",
        autoDismiss: true,
      });
      setIsUpdateDistributionCollection(true);
      props.listDistributions({
        requestor: context.employeeProfile.id,
        isPickup: true,

        companyId: context.employeeProfile.companyId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isDistributionCollection,
    isProofCollection,
    isUpdateDistributionCollection,
  ]);
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

    sigCanvas.current?.clear();
    setImgSrc("");
    setPrintedName("");
  };
  const takePhotoHandler = () => {
    setImgSrc("");
    setIsPhotoOpen(true);
  };
  const closePhotoHandler = () => {
    setIsPhotoOpen(false);
  };
  const onUsePhotoHandler = (img) => {
    setImgSrc(img);
    setIsPhotoOpen(false);
  };
  const inputHandler = ({ target }) => {
    console.log("[Target Name]", target.name);
    if (target.name === "printedName") {
      setPrintedName(target.value);
    } else if (target.name === "client") {
      setClient(target.value);
      setDataSource(
        originalSource.filter(
          (f) =>
            f.patientCd === target.value &&
            f.category === "Medical/Incontinence"
        )
      );
    }
  };

  const saveHandler = () => {
    const signImg = sigCanvas.current?.getCanvas().toDataURL("image/png");
    const orderIds = dataSource.map((p) => p.record_id);

    const finalPayload = [];
    for (const orderId of orderIds.filter((o) => o)) {
      const params = {
        created_at: new Date(),
        category: "pickup_signature",
        record_id: orderId || "",
        image_based: signImg,
        printedName: printedName,
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
      };
      finalPayload.push(params);
    }
    if (imgSrc) {
      for (const orderId of orderIds.filter((o) => o)) {
        const params = {
          created_at: new Date(),
          category: "pickup_photo",
          record_id: orderId || "",
          image_based: imgSrc,
          printedName: printedName,
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
        };
        finalPayload.push(params);
      }
    }

    props.createProof(finalPayload);
    setIsRefresh(!isRefresh);
  };
  if (
    isDistributionCollection &&
    props.distributions?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsDistributionCollection(false);
  }
  if (
    isProofCollection &&
    props.proofState &&
    props.proofState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsProofCollection(false);
  }
  if (
    isUpdateDistributionCollection &&
    props.updateDistributionState &&
    props.updateDistributionState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsUpdateDistributionCollection(false);
  }
  const refreshHandler = () => {
    clearHandler();
    setIsProcessDone(false);
    props.listDistributions({
      requestor: context.employeeProfile.id,
      isPickup: true,
      companyId: context.employeeProfile.companyId,
    });
  };
  console.log("[CONTEXt]", context);
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
        <Base refreshHandler={refreshHandler} />

        <div
          align="center"
          style={{ paddingLeft: 16, paddingBottom: 4, paddingRight: 16 }}
        >
          <Typography
            style={{ color: "white", background: "#033D39" }}
            variant="h6"
          >
            Pickup Tracking
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
                There are currently no supplies available for client pickup.
                Please refresh the page to check for any available supplies.
              </Typography>
            </div>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: client && client !== "Select" ? "" : "none",
          }}
        >
          <div align="left" style={{ paddingLeft: 16, paddingTop: 5 }}>
            <Typography style={{ color: "white" }} variant="h6">
              {`Supplies (${dataSource.length})`}
            </Typography>
          </div>

          <Pod isMobile={context.isMobile} dataSource={dataSource} />

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
          <div align="left" style={{ paddingLeft: 16, paddingTop: 5 }}>
            <Typography style={{ color: "white" }} variant="h6">
              Received By:
            </Typography>
          </div>
          <div
            align="left"
            style={{
              marginLeft: 16,
              marginRight: 16,
              paddingBottom: 4,
            }}
          >
            <TextField
              name="printedName"
              value={printedName}
              placeholder="Printed Name"
              style={{ width: "100%", background: "white" }}
              onChange={inputHandler}
            />
          </div>
          <div
            style={{
              gap: 10,
              paddingTop: 2,
              paddingLeft: 16,
              paddingBottom: 2,
            }}
          >
            {" "}
            {imgSrc && (
              <img src={imgSrc} alt="proof" height="120px" width="120px" />
            )}
          </div>
          <div
            style={{
              display: "inline-flex",
              gap: 10,
              paddingTop: 2,
              paddingLeft: 16,
              paddingBottom: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={takePhotoHandler}
              startIcon={<CameraAlt />}
            >
              {imgSrc ? "Retake Photo" : "Take Photo"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveHandler()}
            >
              Submit
            </Button>
          </div>
        </div>
        {isPhotoOpen && (
          <PhotoModal
            isOpen={isPhotoOpen}
            isMobile={context.isMobile}
            closePhotoHandler={closePhotoHandler}
            onUsePhotoHandler={onUsePhotoHandler}
          />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (store) => ({
  distributions: distributionListStateSelector(store),
  proofState: proofCreateStateSelector(store),
  updateDistributionState: distributionUpdateStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
  resetListDistributions: () => dispatch(resetFetchDistributionState()),
  createProof: (data) => dispatch(attemptToCreateProof(data)),
  resetCreateProof: () => dispatch(resetCreateProofState()),
  updateDistribution: (data) => dispatch(attemptToUpdateDistribution(data)),
  resetUpdateDistribution: () => dispatch(resetUpdateDistributionState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
