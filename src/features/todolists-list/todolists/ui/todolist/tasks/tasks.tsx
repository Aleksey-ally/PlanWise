import React from "react";
import s from "./tasks.module.css";
import { Task } from "./task/task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  moveTask: (from: number, to: number) => void
};

export const Tasks = ({ todolist, tasks, moveTask }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <div className={s.tasks}>
      {tasksForTodolist.map((t, index) => (
        <Task
          key={t.id}
          task={t}
          todolistId={todolist.id}
          index={index}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};