import React from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/model/todolists.slice";

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
                style={{color:"#007BFF", borderColor:"#007BFF"}}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "outlined" : "text"}
                onClick={() => changeTasksFilter('active')}
                style={{color:"#F39C12", borderColor:"#F39C12"}}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "outlined" : "text"}
                onClick={() => changeTasksFilter('completed')}
                color={"success"}
            >
                Completed
            </Button>
        </>
    );
};