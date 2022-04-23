export default interface PaymentsFilters {
  date_gte?: Date;
  date_lte?: Date;
  isPaid?: string;
  title?: string;
  username?: string;
  value_gte?: string;
  value_lte?: string;
}
