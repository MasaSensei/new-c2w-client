const formatDate = (date?: string | Date) => {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default formatDate;
