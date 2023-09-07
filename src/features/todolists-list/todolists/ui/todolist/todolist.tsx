import React, { useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.reducer";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/enums/components";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import {
  FilterTasksButtons
} from "features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons";
import { Tasks } from "features/todolists-list/todolists/ui/todolist/tasks/tasks";
import { TodolistTitle } from "features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(({ todolist, tasks }: Props) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = useCallback(
    (title: string) => {
      addTask({ title, todolistId: todolist.id });
    },
    [todolist.id]
  );

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </>
  );
});
