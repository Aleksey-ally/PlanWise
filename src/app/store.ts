import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "features/todolists-list/tasks/model/tasks.slice";
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists.slice";
import { appReducer } from "app/app.reducer";
import { authSlice } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appReducer,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
