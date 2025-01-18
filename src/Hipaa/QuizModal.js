import { Close } from "@mui/icons-material";
import { Button, Grid, Modal, Paper, Typography } from "@mui/material";

export default function QuizModal(props) {
  const { isOpen } = props;

  const body = (
    <Paper
      elevation={2}
      style={{
        paddingLeft: 4,
        paddingRight: 4,
        width: !props.isMobile ? "50%" : "100%",
        //    height: props.isMobile ? "50%" : "40%",
      }}
    >
      <div style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>
        <Grid container justifyContent="space-between">
          <Typography variant="body" style={{ fontWeight: "bold" }}>
            Quiz Result
          </Typography>
          <Close onClick={() => props.onCloseHandler()} />
        </Grid>
        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Typography variant="h6">{`Congratulations! You total score is ${props.score}%`}</Typography>
        </div>
        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => props.downloadCertificateHandler()}
          >
            Download Certificate
          </Button>
        </div>
      </div>
    </Paper>
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        open={isOpen ? true : false}
        onClose={props.onCloseHandler}
        aria-labelledby="yn-modal"
        aria-describedby="yes-or-no"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
