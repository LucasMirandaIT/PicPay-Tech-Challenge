const CurrencyUtils = {
  formatCurrency: (value: string) => {
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
    return formattedValue;
  },
};

export default CurrencyUtils;
