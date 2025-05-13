import React from 'react'
import DashboardProvider from '../context/dashboard/DashboardProvider'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <DashboardProvider>
        {children}
    </DashboardProvider>
  )
}

export default layout