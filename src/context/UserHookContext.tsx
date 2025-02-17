import { useContext } from "react"
import { UserContext } from "./UserContext"

export const UserHookContext = () => {
    const context = useContext(UserContext)

    if(!context) {
        throw new Error("Out of context")
    }

    return context
}