import { Tune } from "@mui/icons-material";
import {
  Button,
  FormControl,
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
    //   REFACTOR
    const value = type.toLowerCase().includes("date")
      ? event
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
        (key == "isPaid" && filteredFilters[key].length === 2)
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
            <InputLabel htmlFor="pageHeader-search-input">Usuários</InputLabel>
            <OutlinedInput
              id="pageHeader-search-input"
              type="text"
              inputProps={{ "data-testid": "username-filter-input" }}
              value={filters.username}
              onChange={handleChange("username")}
            />
          </FormControl>
          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            <InputLabel htmlFor="pageHeader-search-input">Título</InputLabel>
            <OutlinedInput
              id="pageHeader-search-input"
              type="text"
              inputProps={{ "data-testid": "title-filter-input" }}
              value={filters.title}
              onChange={handleChange("title")}
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
            <InputLabel htmlFor="pageHeader-minValue-input">
              Valor Mínimo
            </InputLabel>
            <OutlinedInput
              id="pageHeader-minValue-input"
              type="text"
              value={filters.value_gte}
              onChange={handleChange("value_gte")}
            />
          </FormControl>

          <FormControl
            margin="normal"
            className="filter-container"
            variant="outlined"
          >
            <InputLabel htmlFor="pageHeader-maxValue-input">
              Valor Máximo
            </InputLabel>
            <OutlinedInput
              id="pageHeader-maxValue-input"
              type="text"
              value={filters.value_lte}
              onChange={handleChange("value_lte")}
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
              <MenuItem hidden value=""></MenuItem>
              <MenuItem value="true">Paid</MenuItem>
              <MenuItem value="false">Not Paid</MenuItem>
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
