import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/enums/components";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import {
  FilterTasksButtons
} from "features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons";
import { Tasks } from "features/todolists-list/todolists/ui/todolist/tasks/tasks";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo((props: Props) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCallBack = useCallback(
    (title: string) => {
      addTask({ title, todolistId: props.todolist.id });
    },
    [props.todolist.id]
  );

  const removeTodolistHandler = () => {
    removeTodolist(props.todolist.id);
  };

  const changeTodolistTitleCallBack = useCallback(
    (title: string) => {
      changeTodolistTitle({ title, id: props.todolist.id });
    },
    [props.todolist.id]
  );


  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCallBack} />
        <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks tasks={props.tasks} todolist={props.todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
