import { todoTypes } from "./todo"
export interface todoContext {
    isShow?: boolean,
    todos?: todoTypes[],
    setIsShow?: React.Dispatch<React.SetStateAction<any>>,
    getData?:any
}