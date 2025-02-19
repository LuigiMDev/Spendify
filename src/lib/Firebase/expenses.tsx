import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig"

export const addExpense = async (title: string, description: string, type: string, price: number) => {
    const user = auth.currentUser;

        if (!user) {
            throw new Error("Usuário não autenticado")
        }

        const expenseId = crypto.randomUUID();

        const newExpense = {
            id: expenseId,
            title,
            description,
            type,
            price
        }

        await updateDoc(doc(db, "users", user.uid), {
            expenses: arrayUnion(newExpense)
        })
}

export const getExpenses = (setExpenses: (expense: any[]) => void) => {

    const user = auth.currentUser

    if(!user) {
        throw new Error("Usuário não encontrado")
    }

    const subscrible = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (!docSnap) {
            throw new Error("Usuário não encontrado no banco de dados")
        }
        const data = docSnap.data();
        const expenses = data?.expenses ?? []

         setExpenses(expenses)
    })

    return () => subscrible()
}