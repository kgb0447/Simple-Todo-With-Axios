import { createContext } from "react";
import { todoContext } from "../dto/todoContext";

export const TodoContext = createContext<todoContext>({}); 