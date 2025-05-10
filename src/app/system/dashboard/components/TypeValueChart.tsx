"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useDashboard from "../../context/dashboard/useDashboard"

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
    label: "Other",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig

const getFormatedDate = () => {
    const date = (new Date).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    })
    return date.charAt(0).toUpperCase() + date.slice(1)
}

export function TypeValueChart() {
  const {typeChartData} = useDashboard()
  let chartData: object[] = []
  if(typeChartData) {
    chartData = Object.entries(typeChartData).filter(([key]) => key !== "totalValue").map(([key, value]) => (
      {
        type: key,
        value,
        fill: `var(--color-${key})`
      }
    ))
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Valor por tipo</CardTitle>
        <CardDescription>{getFormatedDate()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {typeChartData?.totalValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default TypeValueChart
