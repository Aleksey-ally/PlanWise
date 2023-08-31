import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {
    TodolistDomainType,
    todolistsActions,
    todolistsThunks
} from "features/todolists-list/todolists/model/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/enums/components";
import {Task} from "features/todolists-list/todolists/ui/todolist/task/task";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist = React.memo((props: Props) => {
    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {changeTodolistFilter} = useActions(todolistsActions);
    const {changeTodolistTitle, removeTodolist} = useActions(todolistsThunks);

    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTaskCallBack = useCallback(
        (title: string) => {
            addTask({title, todolistId: props.todolist.id});
        },
        [props.todolist.id],
    );

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id);
    };

    const changeTodolistTitleCallBack = useCallback(
        (title: string) => {
            changeTodolistTitle({title, id: props.todolist.id});
        },
        [props.todolist.id],
    );

    const onAllClickHandler = useCallback(
        () => changeTodolistFilter({id: props.todolist.id, filter: "all"}),
        [props.todolist.id],
    );
    const onActiveClickHandler = useCallback(
        () => changeTodolistFilter({id: props.todolist.id, filter: "active"}),
        [props.todolist.id],
    );
    const onCompletedClickHandler = useCallback(
        () => changeTodolistFilter({id: props.todolist.id, filter: "completed"}),
        [props.todolist.id],
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCallBack}/>
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button
                    variant={props.todolist.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
