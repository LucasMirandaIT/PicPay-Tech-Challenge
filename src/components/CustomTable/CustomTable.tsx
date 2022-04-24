import {
  ArrowDownward,
  ArrowUpward,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { ChangeEvent, useCallback } from "react";
import Payment from "../../interfaces/Payment";
import CurrencyUtils from "../../utils/CurrencyUtils";

interface TableHeader {
  id: string;
  title: string;
  sortable: boolean;
  align: "inherit" | "left" | "center" | "right" | "justify";
}
interface CustomTableProps {
  order: string;
  setOrder: (value: string) => void;
  orderBy: string;
  setOrderBy: (value: string) => void;
  payments: Array<Payment>;
  changeCheckbox: (
    event: ChangeEvent<HTMLInputElement>,
    row: any
  ) => void;
  handleAddModal: (row: Payment) => void;
  handleRemoveModal: (row: Payment) => void;
}

const CustomTable = ({
  order,
  setOrder,
  orderBy,
  setOrderBy,
  payments,
  changeCheckbox,
  handleAddModal,
  handleRemoveModal,
}: CustomTableProps) => {
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
  return (
    <TableContainer>
      <Table className="payments-table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {paymentsTableHeader.map((header, i) => {
              if (header.sortable) {
                return (
                  <TableCell
                    className="sortable-header"
                    align={header.align}
                    data-testid={`header-${header.id}`}
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
                  data-testid={`checkbox-${row.id}`}
                  checked={row.isPaid}
                  onChange={(event) => changeCheckbox(event, row)}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  data-testid="edit-button"
                  onClick={() => handleAddModal(row)}
                >
                  <EditOutlined />
                </IconButton>
                <IconButton
                  data-testid="delete-button"
                  onClick={() => handleRemoveModal(row)}
                >
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
  );
};

export default CustomTable;
