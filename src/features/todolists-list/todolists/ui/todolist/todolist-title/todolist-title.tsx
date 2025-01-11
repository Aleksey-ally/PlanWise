import React, { useCallback } from "react";
import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists.slice";
import { useActions } from "common/hooks";

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {

  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleCallBack = useCallback(
    (title: string) => {
      changeTodolistTitle({ title, id: todolist.id });
    },
    [todolist.id]
  );

  return (
    <>
      <h3 style={{display:"flex", alignItems:"center"}}>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallBack} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete style={{color:"#8B0000"}} />
        </IconButton>
      </h3>
    </>
  );
};