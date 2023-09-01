import React from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/model/todolists.reducer";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButtons = ({todolist}: Props) => {
    const {changeTodolistFilter} = useActions(todolistsActions);

    const changeTasksFilter = (filter: FilterValuesType) => {
        changeTodolistFilter({id: todolist.id, filter})
    }

    return (
        <>
            <Button
                variant={todolist.filter === "all" ? "outlined" : "text"}
                onClick={() => changeTasksFilter('all')}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "outlined" : "text"}
                onClick={() => changeTasksFilter('active')}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "outlined" : "text"}
                onClick={() => changeTasksFilter('completed')}
                color={"secondary"}
            >
                Completed
            </Button>
        </>
    );
};