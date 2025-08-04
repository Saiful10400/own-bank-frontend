import { createContext } from "react";
import type { Tcontext } from "./type.context";
 
const ContextProvider=createContext<Tcontext|null>(null)

export default ContextProvider