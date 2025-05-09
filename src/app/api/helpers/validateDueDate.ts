export const validateDueDate = (searchDueDate: string) => {
  const regexDueDate = /^\d{4}-(0[1-9]|1[0-2])$/;
  const isValidDueDate = regexDueDate.test(searchDueDate);
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (isValidDueDate) {
    const [year, month] = searchDueDate.split("-").map(Number);

    startDate = new Date(Date.UTC(year, month - 1, 1));
    endDate = new Date(Date.UTC(year, month, 1));
  }

  return {isValidDueDate, startDate, endDate}
};
