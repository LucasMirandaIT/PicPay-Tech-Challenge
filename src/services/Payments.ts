import axios from "axios";
import Payment from "../interfaces/Payment";

export const paymentsServices = {
  getPayments: (
    currentPage: number,
    itemsLimit: number,
    filtersQuery: string,
    orderBy: string,
    order: string
  ) =>
    axios.get(
      `http://localhost:3030/tasks?_page=${currentPage}&_limit=${itemsLimit}${
        filtersQuery && filtersQuery
      }&_sort=${orderBy}&_order=${order}`
    ),
  updatePayment: (id: string, body: Payment) =>
    axios.put(`http://localhost:3030/tasks/${id}`, body),
  removePayment: (id: string) =>
    axios.delete(`http://localhost:3030/tasks/${id}`),
  createPayment: (body: Partial<Payment>) =>
    axios.post(`http://localhost:3030/tasks/`, body),
};
