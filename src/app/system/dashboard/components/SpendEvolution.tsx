"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import LoadingChart from "./LoadingChart";
import NoDataChart from "./NoDataChart";
import { useDashboard } from "@/app/ZustandContext/dashboard";
import {useShallow} from "zustand/shallow"

const chartConfig = {
  valor: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function SpendEvolution() {
  const [spendEvolutionData, isLoading] = useDashboard(useShallow((state) => [
    state.spendEvolutionData,
    state.isLoading,
  ]));

  const chartData = spendEvolutionData?.groupByMonth
    ? spendEvolutionData.allDatesGrouped?.map((spend, index) => ({
        key: `spend-${index}`,
        Data: new Date(spend.date).toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }),
        Valor: spend.value,
        fill: "hsl(var(--chart-1))",
      }))
    : spendEvolutionData?.allDatesGrouped?.map((spend, index) => ({
        key: `spend-${index}`,
        Data: new Date(spend.date).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }),
        Valor: spend.value,
        fill: "hsl(var(--chart-1))",
      }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Gastos pagos por {spendEvolutionData?.groupByMonth ? "mês" : "dia"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingChart />
        ) : (chartData ?? []).length > 0 ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, "auto"]} />
              <XAxis
                dataKey="Data"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="Valor"
                type="monotone"
                stroke="var(--color-valor)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-valor)",
                }}
                activeDot={{
                  r: 6,
                }}
              ></Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <NoDataChart />
        )}
      </CardContent>
    </Card>
  );
}
