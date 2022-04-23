import { AlertColor } from "@mui/material";

export interface SnackbarOptions {
  visible: boolean;
  message: string;
  severity?: AlertColor | undefined;
}
