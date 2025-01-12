import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.slice";
import s from "features/todolists-list/todolists/ui/todolist/tasks/task/task.module.css";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  task: TaskType;
  todolistId: string;
  index: number;
  moveTask: (from: number, to: number) => void;
};

const ItemType = "TASK";

export const Task = React.memo(({ task, todolistId, index, moveTask }: Props) => {
  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const { removeTask, updateTask } = useActions(tasksThunks);

  const [, ref] = useDrag({
    type: ItemType,
    item: { index, todolistId, taskId: task.id },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        console.log("Task drop failed or outside valid area");
      }
    }
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: { index: number; todolistId: string }) => {
      if (item.todolistId !== todolistId) {
        console.log("Blocked task movement between different lists");
        return;
      }
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    }
  });

  const changeStatusHandler =
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
      updateTask({
        taskId: task.id,
        todolistId,
        domainModel: { status }
      });
    };

  const changeTitleHandler =
    (title: string) => {
      updateTask({ taskId: task.id, todolistId, domainModel: { title } });
    };

  return (
    <div ref={(node) => ref(drop(node))} key={task.id}
         className={`${s.task} ${task.status === TaskStatuses.Completed ? s.isDone : ""}`}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete className={s.icon} />
      </IconButton>
    </div>
  );
});