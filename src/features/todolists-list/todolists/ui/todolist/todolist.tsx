import React, { useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import {
  FilterTasksButtons
} from "features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons";
import { Tasks } from "features/todolists-list/todolists/ui/todolist/tasks/tasks";
import { TodolistTitle } from "features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  index:number
  moveTodo: (fromIndex: number, toIndex: number) => void
};

const ItemType = "TODO_LIST";

export const Todolist = React.memo(({ todolist, tasks, index, moveTodo }: Props) => {
  const { fetchTasks, addTask, changeTasksOrder } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = useCallback(
    (title: string) => {
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [todolist.id]
  );

  const [, ref] = useDrag({
    type: ItemType,
    item: { todoId:todolist.id, index },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        console.log("Todo drop failed or outside valid area");
      }
    }
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });


  // Функция для перемещения задач
  const moveTask = (from: number, to: number) => {
    const updated = [...tasks];

    const movedTask = updated[from];

    let frontTaskId;

    if (updated[to - 1]) {
      frontTaskId = updated[to - 1].id;

    } else {
      frontTaskId = null;
    }
    const arg = {
      taskId: movedTask.id,
      todolistId: movedTask.todoListId,
      putAfterItemId: frontTaskId
    };
    changeTasksOrder(arg);
  };

  return (
    <div ref={(node) => ref(drop(node))}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} moveTask={moveTask} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
})
