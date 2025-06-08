import { prismadb } from "../api/prismaClient";
import { ExpenseStatus, ExpenseType } from "@/generated/prisma";
import { getUserAuthentication } from "../api/helpers/auth/getUserAuthentication";
import { validateDate } from "./validateDate";
import { expensesSearchParams } from "../system/types/expensesSearchParams";

export const getExpenses = async ({
  searchInput,
  page,
  searchType,
  searchStatus,
  searchDueDate,
  searchPaymentDate,
}: expensesSearchParams) => {
  const limit = 30;

  const isValidType = Object.values(ExpenseType).includes(
    searchType as ExpenseType
  );

  const isValidStatus = Object.values(ExpenseStatus).includes(
    searchStatus as ExpenseStatus
  );

  const {
    isValidDueDate,
    isValidPaymentDate,
    startDueDate,
    endDueDate,
    startPaymentDate,
    endPaymentDate,
  } = validateDate(searchDueDate, searchPaymentDate);

  const { id } = (await getUserAuthentication()) as { id: string };

  const totalExpenses = await prismadb.expense.count({
    where: {
      userId: id,
      OR: [
        {
          title: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
      ],
      ...(isValidType && {
        type: searchType as ExpenseType,
      }),
      ...(isValidStatus && {
        status: searchStatus as ExpenseStatus,
      }),
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
  });

  const totalPages = Math.ceil(totalExpenses / limit);

  const expenses = await prismadb.expense.findMany({
    where: {
      userId: id,
      OR: [
        {
          title: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
      ],
      ...(isValidType && {
        type: searchType as ExpenseType,
      }),
      ...(isValidStatus && {
        status: searchStatus as ExpenseStatus,
      }),
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
    skip: (page - 1) * limit,
    take: limit,
  });

  return { expenses, totalPages };
};
