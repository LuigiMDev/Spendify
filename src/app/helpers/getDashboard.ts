import { getUserAuthentication } from "../api/helpers/auth/getUserAuthentication";
import { dashboardSearchParams } from "../system/types/dashboardSearchParams";
import { validateDate } from "./validateDate";
import { prismadb } from "../api/prismaClient";
import { getTypeChart } from "./getTypeChart";
import { getStatusData } from "./getStatusData";
import { getSpendEvolution } from "./getSpendEvolution/getSpendEvolution";

export const getDashboard = async ({
  searchDueDate,
  searchPaymentDate,
}: dashboardSearchParams) => {
  const {
    isValidDueDate,
    startDueDate,
    endDueDate,
    isValidPaymentDate,
    startPaymentDate,
    endPaymentDate,
  } = validateDate(searchDueDate, searchPaymentDate);

  const { id } = (await getUserAuthentication()) as { id: string };

  const data = await prismadb.expense.findMany({
    where: {
      userId: id,
      ...(isValidDueDate && {
        dueDate: {
          gte: startDueDate,
          lt: endDueDate,
        },
      }),
      ...(isValidPaymentDate && {
        paymentDate: {
          gte: startPaymentDate,
          lt: endPaymentDate,
        },
      }),
    },
    orderBy: { createdAt: "desc" },
  });

  const statusData = getStatusData(data);
  const spendEvolution = getSpendEvolution(data);
  const typeChart = getTypeChart(data);

  return { statusData, spendEvolution, typeChart };
};
