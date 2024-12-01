export function formatToCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatToPercentage(value, locale = "en-US", decimals = 2) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function convertTimestampToReadableDate(timestamp, locale = "en-US") {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
