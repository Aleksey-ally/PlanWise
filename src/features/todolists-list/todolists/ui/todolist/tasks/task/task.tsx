import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import s from 'features/todolists-list/todolists/ui/todolist/tasks/task/task.module.css'

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task = React.memo(({task, todolistId}: Props) => {
    const removeTaskHandler = () => removeTask({taskId: task.id, todolistId});

    const {removeTask, updateTask} = useActions(tasksThunks)

    const changeStatusHandler =
        (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
            updateTask({
                taskId: task.id,
                todolistId,
                domainModel: {status}
            })
        };

    const changeTitleHandler =
        (title: string) => {
            updateTask({taskId: task.id, todolistId, domainModel: {title}})
        };

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={changeStatusHandler}/>

            <EditableSpan value={task.title} onChange={changeTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
