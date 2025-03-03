import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "app/app.reducer";
import {
  ChangeTodoOrderArgType,
  todolistsApi,
  TodolistType,
  UpdateTodolistTitleArgType
} from "features/todolists-list/todolists/api/todolists.api";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";
import { clearTasksAndTodolists } from "common/actions";

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  "todo/fetchTodolists",
  async (_) => {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  }
);

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  "todo/addTodolist",
  async (title, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await todolistsApi.createTodolist(title);
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false });
    }
  }
);

const removeTodolist = createAppAsyncThunk<{ id: string }, string>("todo/removeTodolist", async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
  const res = await todolistsApi.deleteTodolist(id);
  if (res.data.resultCode === ResultCode.Success) {
    return { id };
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true });
  }
});

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  "todo/changeTodolistTitle",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await todolistsApi.updateTodolist(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }

  }
);

const changeTodoOrder = createAppAsyncThunk<ChangeTodoOrderArgType, ChangeTodoOrderArgType>(
  "todo/changeOrder",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await todolistsApi.changeTodoOrder(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }
  });

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle"
        };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      })
      .addCase(changeTodoOrder.fulfilled, (state, action) => {
        const indexMovedTodo = state.findIndex((t) => t.id === action.payload.todolistId)
        const indexAfterTodo = state.findIndex((t) => t.id === action.payload.putAfterItemId)

        const [movedTodo] = state.splice(indexMovedTodo, 1);
        state.splice(indexAfterTodo + 1, 0, movedTodo)
      })
      .addCase(clearTasksAndTodolists, () => {
        return [];
      });
  }
});

export const todolistsSlice = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle, changeTodoOrder};

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
