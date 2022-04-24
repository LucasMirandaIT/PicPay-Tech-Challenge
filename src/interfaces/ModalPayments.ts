import Payment from "./Payment";

export default interface ModalPayments {
  open: boolean;
  data: Payment;
  handleClose: (event: object, reason: string) => void;
}
