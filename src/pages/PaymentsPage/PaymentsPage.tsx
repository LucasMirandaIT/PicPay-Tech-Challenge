import { Box, Button } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import CustomTable from "../../components/CustomTable/CustomTable";
import FilterBar from "../../components/Filterbar/Filterbar";
import TablePagination from "../../components/TablePagination/TablePagination";
import Payment from "../../interfaces/Payment";
import { SnackbarOptions } from "../../interfaces/SnackbarOptions";
import AddPayment from "../../modals/AddPayment/AddPayment";
import RemovePayment from "../../modals/RemovePayment/RemovePayment";
import { paymentsServices } from "../../services/Payments";

import "./PaymentsPage.scss";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [itemsLimit, setItemsLimit] = useState(10);
  const [filtersActive, setFiltersActive] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const [openAddPaymentModal, setOpenAddPaymentModal] = useState(false);
  const [openRemovePaymentModal, setOpenRemovePaymentModal] = useState(false);

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

  const handleChangeCheckbox = (event: any, row: Payment) => {
    paymentsServices
      .updatePayment(row.id, { ...row, isPaid: event.target.checked })
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

  useEffect(() => {
    fetchPayments(1, 10, "", "username", "asc");
  }, []);

  const handleAddModal = (data: Payment) => {
    setOpenAddPaymentModal(true);
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
    });
  };

  const handleRemoveModal = (data: Payment) => {
    setOpenRemovePaymentModal(true);
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
    });
  };

  const handleCloseModal = (event: object, reason: string) => {
    if (openAddPaymentModal) setOpenAddPaymentModal(false);
    if (openRemovePaymentModal) setOpenRemovePaymentModal(false);
    if (reason !== "" && reason !== "backdropClick") {
      fetchPayments(1, 10, "", orderBy, order);
      setSnackbarOptions({
        visible: true,
        message: reason,
        severity: "success",
      });
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
          <CustomTable
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            payments={payments}
            handleAddModal={handleAddModal}
            handleRemoveModal={handleRemoveModal}
            changeCheckbox={handleChangeCheckbox}
          />
          <TablePagination
            totalCount={totalCount}
            currentPage={page}
            pageSize={itemsLimit}
            onPageChange={handlePageChange}
          />
        </Box>
        <AddPayment
          open={openAddPaymentModal}
          data={modalOptions?.data}
          handleClose={handleCloseModal}
        />
        <RemovePayment
          open={openRemovePaymentModal}
          data={modalOptions?.data}
          handleClose={handleCloseModal}
        />
        <CustomSnackbar
          snackbarOptions={snackbarOptions}
          handleClose={handleCloseSnackbar}
        />
      </section>
    </div>
  );
};

export default PaymentsPage;
