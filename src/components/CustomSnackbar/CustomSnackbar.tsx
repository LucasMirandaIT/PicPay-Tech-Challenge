import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent } from "react";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";

interface SnackbarProps {
  snackbarOptions: SnackbarOptions;
  handleClose: (event: SyntheticEvent | Event, reason: string) => void;
}

const CustomSnackbar = ({ snackbarOptions, handleClose }: SnackbarProps) => (
  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    autoHideDuration={2500}
    open={snackbarOptions.visible}
    onClose={handleClose}
  >
    <Alert severity={snackbarOptions.severity}>{snackbarOptions.message}</Alert>
  </Snackbar>
);

export default CustomSnackbar;
