import {
  Button,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import brLocale from "date-fns/locale/pt-BR";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./AddPayment.scss";
import ModalPayments from "../../interfaces/ModalPayments";
import { paymentsServices } from "../../services/Payments";

const AddPayment = ({ data, handleClose }: ModalPayments) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    value: "",
    date: null,
    title: "",
  });

  const dateRef = useRef();

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
    <section className="modal-body">
      <DialogTitle></DialogTitle>
      <h3 className="title">Adicionar Pagamento</h3>
      <Grid container spacing={2} className="informations">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label={"Nome"}
            required
            value={values?.name}
            onChange={handleChangeText("name")}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label="Usuário"
            required
            value={values?.username}
            onChange={handleChangeText("username")}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label="Título"
            required
            value={values?.title}
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
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
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
          onClick={(event) => handleClose(event, "")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
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
  );
};

export default AddPayment;
