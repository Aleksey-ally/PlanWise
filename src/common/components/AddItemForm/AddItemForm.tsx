import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { RejectValueType } from "common/utils/create-app-async-thunk";

type AddItemFormPropsType = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean;
};

export const AddItemForm = React.memo(function({ addItem, disabled = false }: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title).then(() => {
        setTitle("");
      }).catch((err: RejectValueType) => {
        if (err.data) {
          const messages = err.data.messages;
          setError(messages.length ? messages[0] : "Some error occurred");
        }
      });
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
        InputProps={{
          style: {
            color: "#C4C4C4"
          }
        }}
        InputLabelProps={{
          style: {
            color: "#D3D3D3"
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#7D7D7D" // Цвет рамки
            },
            "&:hover fieldset": {
              borderColor: "#7D7D7D" // Цвет рамки при hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7D7D7D" // Цвет рамки при фокусе
            }
          }
        }}
      />
      <IconButton style={{ color: "#8A8C8E" }} onClick={addItemHandler} disabled={disabled}>
        <AddBox/>
      </IconButton>
    </div>
  );
});
