import { Tune } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import "./Filterbar.scss";

import brLocale from "date-fns/locale/pt-BR";
import { format } from "date-fns";

interface FilterBarProps {
  handleFilters: (filters: any) => void;
}

const FilterBar = ({ handleFilters }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    username: "",
    title: "",
    value_lte: "",
    value_gte: "",
    isPaid: "",
    date_gte: null,
    date_lte: null,
  });

  const [isCollapsedFilterbar, setIsCollapsedFilterbar] = useState(true);

  const toggleCollapseFilterbar = () => {
    setIsCollapsedFilterbar(!isCollapsedFilterbar);
  };

  const handleChange = (type: string) => (event: any) => {
    const value = type.toLowerCase().includes("date")
      ? format(event, "yyyy-MM-dd")
      : event.target.value;
    setFilters({ ...filters, [type]: value });
  };

  function isEmpty(obj: any) {
    return obj === "" || obj === null || obj === undefined || obj === {};
  }

  const clearFilters = () => {
    setFilters({
      username: "",
      title: "",
      value_lte: "",
      value_gte: "",
      isPaid: "",
      date_gte: null,
      date_lte: null,
    });
    handleFilters({});
    toggleCollapseFilterbar();
  };

  const sendFilters = () => {
    let filteredFilters: any = Object.assign({}, filters);
    for (const key in filteredFilters) {
      if (
        isEmpty(filteredFilters[key]) ||
        (key === "isPaid" && filteredFilters[key].length === 2)
      )
        delete filteredFilters[key];
      //   if(filteredFilters[key])
    }

    handleFilters(Object.entries(filteredFilters));
  };

  return (
    <div
      className={`filterbar-container ${isCollapsedFilterbar && "collapsed"}`}
    >
      {isCollapsedFilterbar && (
        <Button
          variant="contained"
          data-testid="filters-btn"
          onClick={toggleCollapseFilterbar}
        >
          <Tune className="tune-icon" />
          Filtrar
        </Button>
      )}
      {!isCollapsedFilterbar && (
        <section className="filters-box">
          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            <TextField
              fullWidth
              id="pageHeader-search-input"
              label="Usuários"
              value={filters?.username}
              inputProps={{ "data-testid": "username-filter-input" }}
              onChange={handleChange("username")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            <TextField
              fullWidth
              id="pageHeader-search-input"
              label="Título"
              value={filters?.title}
              inputProps={{ "data-testid": "title-filter-input" }}
              onChange={handleChange("title")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <FormControl margin="normal" className="filter-container">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
              <DatePicker
                label="Data Inicial"
                value={filters.date_gte}
                mask="__/__/____"
                onChange={handleChange("date_gte")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl margin="normal" className="filter-container">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
              <DatePicker
                label="Data Final"
                value={filters.date_lte}
                mask="__/__/____"
                onChange={handleChange("date_lte")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            <InputLabel htmlFor="value-input">Valor Mínimo</InputLabel>
            <OutlinedInput
              id="value-input"
              label="Valor Mínimo"
              value={filters?.value_gte}
              onChange={handleChange("value_gte")}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
              }}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            {/* <TextField
              fullWidth
              id="pageHeader-search-input"
              label="Valor Máximo"
              value={filters?.value_lte}
              inputProps={{ "data-testid": "value_lte-add-input" }}
              onChange={handleChange("value_lte")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            /> */}

            <InputLabel htmlFor="value-input">Valor Máximo</InputLabel>
            <OutlinedInput
              id="value-input"
              label="Valor Máximo"
              value={filters?.value_lte}
              onChange={handleChange("value_lte")}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
              }}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>
          <FormControl margin="normal" className="filter-container">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.isPaid}
              label="Status"
              onChange={handleChange("isPaid")}
            >
              <MenuItem hidden disabled value=""></MenuItem>
              <MenuItem value="true">Pago</MenuItem>
              <MenuItem value="false">Não Pago</MenuItem>
            </Select>
          </FormControl>
          <div className="buttons-container">
            <Button
              variant="outlined"
              data-testid="clear-filters-btn"
              onClick={clearFilters}
              sx={{ marginRight: "15px" }}
            >
              Limpar
            </Button>
            <Button
              variant="contained"
              data-testid="send-filters-btn"
              onClick={sendFilters}
            >
              Filtrar
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default FilterBar;
