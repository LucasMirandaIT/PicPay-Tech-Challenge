import {
  ArrowDownward,
  ArrowUpward,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { format } from "date-fns";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import FilterBar from "../../components/Filterbar/Filterbar";
import TablePagination from "../../components/TablePagination/TablePagination";
import Payment from "../../interfaces/Payment";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";
import AddPayment from "../../modals/AddPayment/AddPayment";
import RemovePayment from "../../modals/RemovePayment/RemovePayment";
import { paymentsServices } from "../../services/Payments";
import CurrencyUtils from "../../utils/CurrencyUtils";

import "./PaymentsPage.scss";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [itemsLimit, setItemsLimit] = useState(10);
  const [filtersActive, setFiltersActive] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    visible: false,
    message: "",
  });

  const [modalOptions, setModalOptions] = useState({
    visible: false,
    data: {
      id: "",
      title: "",
      date: "",
      name: "",
      username: "",
      value: "",
    },
    renderElement: () => <></>,
  });

  const fetchPayments = useCallback(
    (
      currentPage: number,
      itemsLimit: number,
      filtersQuery: string,
      orderBy: string,
      order: string
    ) => {
      paymentsServices
        .getPayments(currentPage, itemsLimit, filtersQuery, orderBy, order)
        .then(({ data, headers }: AxiosResponse) => {
          const countResults = Number(headers["x-total-count"]);
          setPayments(data);
          setTotalCount(countResults);
        })
        .catch((err) => {
          setSnackbarOptions({
            visible: true,
            message: err.message,
            severity: "error",
          });
        });
    },
    [filtersActive]
  );

  useEffect(() => {
    fetchPayments(1, 10, "", "username", "asc");
  }, []);

  interface TableHeader {
    id: string;
    title: string;
    sortable: boolean;
    align: "inherit" | "left" | "center" | "right" | "justify";
  }
  const paymentsTableHeader: TableHeader[] = [
    {
      id: "username",
      title: "Usuário",
      sortable: true,
      align: "left",
    },
    {
      id: "title",
      title: "Título",
      sortable: true,
      align: "right",
    },
    {
      id: "date",
      title: "Data",
      sortable: true,
      align: "right",
    },
    {
      id: "value",
      title: "Valor",
      sortable: true,
      align: "right",
    },
    {
      id: "paid",
      title: "Pago",
      sortable: false,
      align: "right",
    },
    {
      id: "actions",
      title: "Ações",
      sortable: false,
      align: "right",
    },
  ];

  const handleAddModal = (data: Payment) => {
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
      renderElement: () => (
        <AddPayment data={data} handleClose={handleCloseModal} />
      ),
    });
  };

  const handleRemoveModal = (data: Payment) => {
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
      renderElement: () => (
        <RemovePayment data={data} handleClose={handleCloseModal} />
      ),
    });
  };

  const handleCloseModal = (event: object, reason: string) => {
    setModalOptions({ ...modalOptions, visible: false });
    if (reason !== "" && reason !== "backdropClick") {
      fetchPayments(1, 10, "", orderBy, order);
      setSnackbarOptions({ visible: true, message: reason, severity: "success" });
    }
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

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const renderActionButton = () => {
    return (
      <Button
        variant="contained"
        className="add-button"
        onClick={() =>
          handleAddModal({
            id: "",
            name: "",
            username: "",
            value: "",
            date: null,
            title: "",
          })
        }
      >
        Adicionar Pagamento
      </Button>
    );
  };

  const dateColumn = useCallback((value: Date) => {
    const dateObj = new Date(value);
    return (
      <>
        {format(dateObj, "dd/MM/yyyy")}
        <br />
        {format(dateObj, "hh:mm")}
      </>
    );
  }, []);

  const changeCheckbox =
    ({ id, ...rest }: any) =>
    (event: any) => {
      paymentsServices
        .updatePayment(id, { id, ...rest, isPaid: event.target.checked })
        .then((res: AxiosResponse) => {
          fetchPayments(page, 10, filtersActive, orderBy, order);
        })
        .catch((err: AxiosError) => {
          setSnackbarOptions({
            visible: true,
            message: err.message,
            severity: "error",
          });
        });
    };

  const checkDirection = (header: TableHeader) => {
    return orderBy === header.id ? (
      order === "asc" ? (
        <ArrowUpward />
      ) : (
        <ArrowDownward />
      )
    ) : (
      ""
    );
  };

  const sortHandler = (property: TableHeader) => {
    const isAsc = orderBy === property.id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.id);
  };

  useEffect(() => {
    fetchPayments(page, 10, filtersActive, orderBy, order);
  }, [orderBy, order, page]);

  const handleSearchFilters = (filters: Array<[]>) => {
    let filtersQuery = filters.length
      ? "&" + filters.map((entry) => entry.join("=")).join("&")
      : "";

    setFiltersActive(filtersQuery);
    fetchPayments(1, 10, filtersQuery, orderBy, order);
  };

  return (
    <div className="pageBody-container">
      <section className="header">
        <span className="title">Meus Pagamentos</span>
        {renderActionButton()}
      </section>
      <section className="content">
        <Box className="pageContent">
          <FilterBar handleFilters={handleSearchFilters} />
          <TableContainer>
            <Table
              className="payments-table"
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {paymentsTableHeader.map((header, i) => {
                    if (header.sortable) {
                      return (
                        <TableCell
                          className="sortable-header"
                          align={header.align}
                          key={i}
                          onClick={() => sortHandler(header)}
                        >
                          {header.title} <span>{checkDirection(header)}</span>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={i} align={header.align}>
                          {header.title}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell scope="row">
                      <p>{row.name}</p>
                      <p>@{row.username}</p>
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{dateColumn(row.date)}</TableCell>
                    <TableCell align="right">
                      {CurrencyUtils.formatCurrency(row.value)}
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        color="primary"
                        checked={row.isPaid}
                        onChange={changeCheckbox(row)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleAddModal(row)}>
                        <EditOutlined />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveModal(row)}>
                        <DeleteOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!payments.length && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      className="emptyTable-message"
                    >
                      Não foi possível encontrar pagamentos com estes filtros.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            totalCount={totalCount}
            currentPage={page}
            pageSize={itemsLimit}
            onPageChange={handlePageChange}
          />
        </Box>
        <Modal open={modalOptions?.visible} onClose={handleCloseModal}>
          <Box className="modal-box">{modalOptions?.renderElement?.()}</Box>
        </Modal>
        <CustomSnackbar snackbarOptions={snackbarOptions} handleClose={handleCloseSnackbar}/>
      </section>
    </div>
  );
};

export default PaymentsPage;
