'use client'
import React, { createContext, useEffect, useState } from "react";
import { typeChartData } from "../../dashboard/types/charts";

type contextProp = {
  typeChartData: typeChartData | undefined;
  setTypeChartData: React.Dispatch<React.SetStateAction<typeChartData | undefined>>
};

export const dashboardContext = createContext<contextProp | null>(null)

const DashboardProvider = ({children}: {children: React.ReactNode}) => {
    const [typeChartData, setTypeChartData] = useState<typeChartData>()

    const handleSearchData = async () => {
        const response = await fetch("/api/dashboard")
        if(!response.ok) {
            throw new Error("Ocorreu um erro ao carregar os dados")
        }
        const data = await response.json()
        setTypeChartData(data.typeChart)
    }

    useEffect(() => {
        handleSearchData()
    }, [])

  return (
    <dashboardContext.Provider value={{typeChartData, setTypeChartData}}>
        {children}
    </dashboardContext.Provider>
  )
};

export default DashboardProvider;
