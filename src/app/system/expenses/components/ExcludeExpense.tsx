import { Expense } from '@/generated/prisma'
import { Trash } from 'lucide-react'
import React from 'react'
import { KeyedMutator } from 'swr'

type props = {
    id: string
    mutate: KeyedMutator<Expense[]>
}

const ExcludeExpense = ({id, mutate}: props) => {

    const handleExcludeExpense = async () => {
        await fetch("/api/expense/expenseById", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })

        mutate(prev => prev?.filter(expense => expense.id !== id))
    }

  return (
    <Trash onClick={handleExcludeExpense} />
  )
}

export default ExcludeExpense