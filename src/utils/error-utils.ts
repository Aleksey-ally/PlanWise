import { Dispatch } from "redux"
import { setErrorAC, SetErrorType, setStatusAC, SetStatusType } from "../app/appReducer"

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string ) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetStatusType | SetErrorType>