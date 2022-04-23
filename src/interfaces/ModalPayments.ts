import Payment from "./Payment";

export default interface ModalPayments {
  data: Payment;
  handleClose: (
    event: object,
    reason: string
  ) => void;
}
