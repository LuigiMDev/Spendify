'use client'
import React, { createContext, useEffect, useState } from "react";
import { statusData, typeChartData } from "../../types/dashboard";

type contextProp = {
  statusData: statusData | undefined;
  setStatusData: React.Dispatch<React.SetStateAction<statusData| undefined>>
  typeChartData: typeChartData | undefined;
  setTypeChartData: React.Dispatch<React.SetStateAction<typeChartData | undefined>>
};

export const dashboardContext = createContext<contextProp | null>(null)

const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  const [statusData, setStatusData] = useState<statusData>()
    const [typeChartData, setTypeChartData] = useState<typeChartData>()

    const handleSearchData = async () => {
        const response = await fetch("/api/dashboard")
        if(!response.ok) {
            throw new Error("Ocorreu um erro ao carregar os dados")
        }
        const data = await response.json()
        setTypeChartData(data.typeChart)
        setStatusData(data.statusData)
    }

    useEffect(() => {
        handleSearchData()
    }, [])

  return (
    <dashboardContext.Provider value={{statusData, setStatusData,typeChartData, setTypeChartData}}>
        {children}
    </dashboardContext.Provider>
  )
};

export default DashboardProvider;
