import dayjs from "dayjs";
export const formatCurrency = (value, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
export const formatDateTime = (value) =>
  value ? dayjs(value).format("MMM D, YYYY, hh:mm A") : "-";
export const formatDate = (value) =>
  value ? dayjs(value).format("MMM D, YYYY") : "-";
export const safe = (value) => value ?? "-";
export const toOptions = (list = [], labelKey = "name", valueKey = "id") =>
  list.map((item) => ({
    label:
      item?.[labelKey] ||
      item?.fullName ||
      item?.brand ||
      `#${item?.[valueKey]}`,
    value: item?.[valueKey],
  }));
