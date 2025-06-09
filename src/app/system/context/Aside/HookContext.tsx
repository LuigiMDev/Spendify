import { useContext } from "react";
import { asideAndDataContext } from "./AsideContextAndData";

const HookContext = () => {
  const useAsideContext = useContext(asideAndDataContext);

  if (!useAsideContext) {
    throw new Error("Contexto não inserido!");
  }

  return useAsideContext;
};

export default HookContext;
