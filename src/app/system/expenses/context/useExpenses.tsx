import React, { useContext } from 'react'
import { expenseContext } from './ExpenseProvider'

const useExpenses = () => {
    const context = useContext(expenseContext)

    if(!context) {
        throw new Error("Fora de contexto!")
    }
  return context
}

export default useExpenses