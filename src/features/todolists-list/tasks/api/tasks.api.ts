import { BaseResponseType } from "common/types";
import { instance } from "common/api";
import {
  AddTaskArgType,
  ChangeTasksOrderArgType,
  GetTasksResponse,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskModelType
} from "features/todolists-list/tasks/api/tasks.api.types";

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<BaseResponseType<{
      item: TaskType
    }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  changeTasksOrder(arg: ChangeTasksOrderArgType) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}/reorder`, { putAfterItemId: arg.putAfterItemId });
  }
};