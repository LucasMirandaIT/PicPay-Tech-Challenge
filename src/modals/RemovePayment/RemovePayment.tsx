import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { SyntheticEvent, useState } from "react";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

import ModalPayments from "../../interfaces/ModalPayments";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";
import { paymentsServices } from "../../services/Payments";
import CurrencyUtils from "../../utils/CurrencyUtils";

import "./RemovePayment.scss";

const RemovePayment = ({ open, data, handleClose }: ModalPayments) => {
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    visible: false,
    message: "",
  });

  const removePayment = () => {
    paymentsServices
      .removePayment(data.id)
      .then((res) => {
        handleClose({}, "Pagamento removido com Sucesso!");
      })
      .catch((err) => {
        setSnackbarOptions({
          visible: true,
          message: err.message,
          severity: "error",
        });
      });
  };

  const parseDate = (date: string) => {
    return date ? format(new Date(date), "dd/MM/yyyy hh:mm") : date;
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOptions({ visible: false, message: "" });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <section className="modal-body">
          <h3 className="title">Remover Pagamento</h3>

          <section className="payment-data">
            <p>Usuário:&nbsp;{data.username}</p>
            <p>Data:&nbsp;{parseDate(data.date)}</p>
            <p>Valor:&nbsp;{CurrencyUtils.formatCurrency(data.value)}</p>
          </section>

          <section className="footer">
            <Button
              variant="contained"
              className="cancel-button"
              data-testid="cancel-btn-remove-modal"
              onClick={() => handleClose({}, "")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              data-testid="remove-payment-btn"
              className="confirm-button"
              onClick={removePayment}
            >
              Salvar
            </Button>
          </section>
          <CustomSnackbar
            snackbarOptions={snackbarOptions}
            handleClose={handleCloseSnackbar}
          />
        </section>
      </Box>
    </Modal>
  );
};

export default RemovePayment;
