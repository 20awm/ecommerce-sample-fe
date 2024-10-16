export default function formatCurrency(
  value,
  locale = "en-US",
  currency = "USD"
) {
  return value.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}
