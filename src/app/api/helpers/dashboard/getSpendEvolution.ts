import { Expense } from "@/generated/prisma";
import { eachDayOfInterval, format} from "date-fns";

export const getSpendEvolution = (data: Expense[]) => {

  const startDate = new Date(data[data.length -1 ].dueDate)
  const endDate = new Date(data[0].dueDate) 

  const allDates = []

  while (startDate < endDate) {
    allDates.push((new Date (startDate)).toISOString().slice(0, 10))
    startDate.setUTCDate(startDate.getUTCDate() + 1)
  }

  console.log(allDates)

  const grouped = data.reduce((acc, expense) => {
    const date = expense.paymentDate;
    if (date) {
      const formatedDate = (new Date(date)).toISOString().slice(0, 10);
      acc[formatedDate] = (acc[formatedDate] || 0) + expense.value;
    }
    return acc;
  }, {} as Record<string, number>);

  const teste = allDates.map((date) => {
    return {
      date,
      value: grouped[date] || 0,
    };
  });

  // console.log(teste)
  return teste
};
