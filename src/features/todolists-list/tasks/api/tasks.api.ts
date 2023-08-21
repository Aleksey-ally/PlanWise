export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
      },
      deleteTask(arg: RemoveTaskArgType) {
        return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
      },
      createTask(arg: AddTaskArgType) {
        return instance.post<
          BaseResponseType<{
            item: TaskType;
          }>
        >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
      },
      updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
      },
}

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
  };

type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
  };
  
   type AddTaskArgType = {
    title: string;
    todolistId: string;
  };

   type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
  };
  
   type UpdateTaskArgType = {
    taskId: string;
    domainModel: UpdateDomainTaskModelType;
    todolistId: string;
  };
  
   type RemoveTaskArgType = {
    todolistId: string;
    taskId: string;
  };