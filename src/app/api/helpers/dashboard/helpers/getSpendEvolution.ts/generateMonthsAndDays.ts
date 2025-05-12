export const generateMonths = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return `${currentYear}-${month}`;
  });
};

export const generateDays = (date: Date) => {
  const [year, month] = new Date(date)
    .toISOString()
    .slice(0, 7)
    .split("-")
    .map(Number);
  const start = new Date(year, month - 1);
  const end = new Date(year, month);

  const allDates = [];

  while (start < end) {
    allDates.push(start.toISOString().slice(0, 10));
    start.setUTCDate(start.getUTCDate() + 1);
  }

  return allDates
};
