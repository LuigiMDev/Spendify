type spendEvolutionDate = {
    date: string
    value: number
}

export type spendEvolution = {
    allDatesGrouped: spendEvolutionDate[],
    groupByMonth: boolean
}

export type statusData = {
    total: number,
    pending: number,
    paid: number
    cancelled: number
}

export type typeChartData = {
    totalValue: number;
    food: number;
    transport: number;
    entertainment: number;
    bills: number;
    rent: number;
    health: number;
    shopping: number;
    other: number;
};