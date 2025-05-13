import { useContext } from 'react'
import { dashboardContext } from './DashboardProvider'

const useDashboard = () => {
    const context = useContext(dashboardContext)
    if(!context) {
        throw new Error("Fora de contexto!")
    }
  return context
}

export default useDashboard