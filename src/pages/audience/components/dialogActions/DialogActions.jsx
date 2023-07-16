import { DialogActions, Button } from "@mui/material";

export default function DialogActionsContainer({onSubmit, CloseDialog, disableSubmit }) {
  return (
    <DialogActions
      sx={{
        position: "absolute",
        bottom: "0",
        width: "96%",
        height: "70px",
        background: "#F6F6F6",
        justifyContent: "flex-start",
      }}
    >
      <Button
        sx={{
          opacity: disableSubmit ? '0.5' : '1',
          background: "#41B494",
          color: "#FFF",
          fontSize: "15px",
          textTransform: "initial",
          marginLeft: "15px",
          "&:hover": {
            backgroundColor: "#41B694",
          },
          pointerEvents: disableSubmit ? 'none' : 'initial'
        }}
        onClick={() => onSubmit()}
      >
        Save the Segment
      </Button>
      <Button
        sx={{
          background: "#FFF",
          color: "red",
          fontSize: "15px",
          textTransform: "initial",
          marginLeft: "20px",
        }}
        onClick={() => CloseDialog(true)}
      >
        Cancel
      </Button>
    </DialogActions>
  );
}
