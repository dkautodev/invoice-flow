export const calculateDueDate = (issueDate, term) => {
  if (!issueDate) return "";
  const date = new Date(issueDate);
  const offset = parseInt(term) || 0;
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

export const calculateTotals = (items, tvaRate) => {
  const totalHT = items.reduce((acc, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    return acc + qty * price;
  }, 0);

  const tvaAmount = (totalHT * (parseFloat(tvaRate) || 0)) / 100;
  const totalTTC = totalHT + tvaAmount;

  return {
    totalHT,
    tvaAmount,
    totalTTC,
  };
};
