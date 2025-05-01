import { useContext } from "react";
import { asideContext } from "./AsideContext";

const HookContext = () => {
    const useAsideContext = useContext(asideContext)

    if(!useAsideContext) {
        throw new Error("Contexto não inserido!")
    }
    
    return useAsideContext
}

export default HookContext