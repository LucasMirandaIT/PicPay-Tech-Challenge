import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

import brLocale from "date-fns/locale/pt-BR";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./AddPayment.scss";
import ModalPayments from "../../interfaces/ModalPayments";
import { paymentsServices } from "../../services/Payments";

const AddPayment = ({ open, data, handleClose }: ModalPayments) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    value: "",
    date: null,
    title: "",
  });

  useEffect(() => {
    data && setValues(data);
  }, [data]);

  const handleChangeText =
    (input: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (input == "value" && event.target.value.startsWith("-"))
        event.target.value = (Number(event.target.value) * -1).toString();
      setValues({
        ...values,
        [input]: event.target.value,
      });
    };
  const handleChangeDate = (input: string) => (event: any) => {
    setValues({
      ...values,
      [input]: event,
    });
  };

  const savePayment = (event: any) => {
    if (data.id) {
      paymentsServices
        .updatePayment(data.id, { id: data.id, ...values })
        .then((res) => {
          handleClose(event, "Pagamento atualizado com sucesso!");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      paymentsServices
        .createPayment(values)
        .then((res) => {
          handleClose(event, "Pagamento criado com sucesso!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <section className="modal-body">
          <DialogTitle></DialogTitle>
          <h3 className="title">Adicionar Pagamento</h3>
          <Grid container spacing={2} className="informations">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="name-input"
                label={"Nome"}
                required
                value={values?.name}
                onChange={handleChangeText("name")}
                inputProps={{ "data-testid": "name-add-input" }}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="username-input"
                label="Usuário"
                required
                value={values?.username}
                inputProps={{ "data-testid": "username-add-input" }}
                onChange={handleChangeText("username")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="title-input"
                label="Título"
                required
                value={values?.title}
                inputProps={{ "data-testid": "title-add-input" }}
                onChange={handleChangeText("title")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="value-input">Valor *</InputLabel>
                <OutlinedInput
                  id="value-input"
                  label="Valor"
                  required
                  value={values?.value}
                  onChange={handleChangeText("value")}
                  type="number"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    min: 0,
                    "data-testid": "value-add-input",
                  }}
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={brLocale}
              >
                <DateTimePicker
                  label="Data *"
                  value={values?.date}
                  mask="__/__/____ __:__"
                  onChange={handleChangeDate("date")}
                  renderInput={(params) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      disabled
                      sx={{ width: "100%" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <section className="footer">
            <Button
              variant="contained"
              className="cancel-button"
              data-testid="cancel-button"
              onClick={(event) => handleClose(event, "")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              data-testid="save-payment-btn"
              disabled={
                !values.date ||
                !values.value ||
                !values.username ||
                !values.name ||
                !values.title
              }
              className="confirm-button"
              onClick={savePayment}
            >
              Salvar
            </Button>
          </section>
        </section>
      </Box>
    </Modal>
  );
};

export default AddPayment;
