import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {appActions, RequestStatusType} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {AppThunk} from '../../app/store';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodoList: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodoList: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodoListFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
        setTodoLists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
    }
})

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(todolistsActions.setTodoLists({todolists: res.data}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodolistTC = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodoListEntityStatus({id, entityStatus: 'loading'}))
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                dispatch(todolistsActions.removeTodoList({id}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(todolistsActions.addTodoList({todolist: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(todolistsActions.changeTodoListTitle({id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsActions = slice.actions
export const todolistsReducer = slice.reducer
