"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useDashboard from "../../context/dashboard/useDashboard";
import LoadingChart from "./LoadingChart";
import NoDataChart from "./NoDataChart";

const chartConfig = {
  food: {
    label: "Comida",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transporte",
    color: "hsl(var(--chart-2))",
  },
  entertainment: {
    label: "Entretenimento",
    color: "hsl(var(--chart-3))",
  },
  bills: {
    label: "Contas",
    color: "hsl(var(--chart-4))",
  },
  rent: {
    label: "Aluguel",
    color: "hsl(var(--chart-5))",
  },
  health: {
    label: "Saúde",
    color: "hsl(var(--chart-6))",
  },
  shopping: {
    label: "Compras",
    color: "hsl(var(--chart-7))",
  },
  other: {
    label: "Outros",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig;

export function TypeValueChart() {
  const { typeChartData, isLoading } = useDashboard();
  let chartData: object[] = [];
  if (typeChartData) {
    chartData = Object.entries(typeChartData)
      .filter(([key]) => key !== "totalValue")
      .map(([key, value]) => ({
        type: key,
        value,
        fill: `var(--color-${key})`,
      }));
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gastos pagos por tipo</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <LoadingChart />
        ) : Object.values(typeChartData || {}).some((value) => value > 0) ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="type" />
            </PieChart>
          </ChartContainer>
        ) : (
          <NoDataChart />
        )}
      </CardContent>
    </Card>
  );
}

export default TypeValueChart;
