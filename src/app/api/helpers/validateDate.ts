export const validateDate = (
  searchDueDate: string,
  searchPaymentDate: string
) => {
  const regexDueDate = /^\d{4}-(0[1-9]|1[0-2])$/;
  const isValidDueDate = regexDueDate.test(searchDueDate);
  const isValidPaymentDate = regexDueDate.test(searchPaymentDate);
  let startDueDate: Date | undefined;
  let endDueDate: Date | undefined;
  let startPaymentDate: Date | undefined;
  let endPaymentDate: Date | undefined;

  if (isValidDueDate) {
    const [year, month] = searchDueDate.split("-").map(Number);

    startDueDate = new Date(Date.UTC(year, month - 1, 1));
    endDueDate = new Date(Date.UTC(year, month, 1));
  }
  if (isValidPaymentDate) {
    const [year, month] = searchPaymentDate.split("-").map(Number);
    startPaymentDate = new Date(Date.UTC(year, month - 1, 1));
    endPaymentDate = new Date(Date.UTC(year, month, 1));
  }

  return {
    isValidDueDate,
    startDueDate,
    endDueDate,
    isValidPaymentDate,
    startPaymentDate,
    endPaymentDate,
  };
};
