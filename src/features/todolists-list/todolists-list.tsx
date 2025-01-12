import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/todolists-list/todolists/model/todolists.slice";
import { Grid, Paper } from "@mui/material";
import { Todolist } from "features/todolists-list/todolists/ui/todolist/todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/todolists-list/tasks/model/tasks.selectors";
import { selectTodolists } from "features/todolists-list/todolists/model/todolists.selectors";
import { AddItemForm } from "common/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const TodolistsList = () => {

  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { addTodolist, fetchTodolists, changeTodoOrder } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolistCallBack = useCallback((title: string) => {
    return addTodolist(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  // Функция для изменения порядка списков
  const moveTodo = (from: number, to: number) => {

    const updatedTodo = [...todolists];

    const movedTodo = updatedTodo[from];

    let frontTodoId;

    if (updatedTodo[to - 1]) {
      frontTodoId = updatedTodo[to - 1].id;

    } else {
      frontTodoId = null;
    }

    const arg = {
      todolistId: movedTodo.id, putAfterItemId: frontTodoId
    };

    changeTodoOrder(arg);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolistCallBack} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl, index) => {
            let allTodolistTasks = tasks[tl.id];
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "16px", backgroundColor: "#25262C" }}>
                  <Todolist
                    todolist={tl}
                    tasks={allTodolistTasks}
                    index={index}
                    moveTodo={moveTodo}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DndProvider>
    </>
  );
};
