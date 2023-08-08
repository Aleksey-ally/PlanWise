import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Обрабатывает ошибку, полученную от сервера, и обновляет состояние приложения.
 * 
 * @template D - Обобщенный тип данных, который может быть возвращен от сервера.
 * @param {BaseResponseType<В>} data - Объект с данными ответа от сервера.
 * @param {Dispatch} dispatch - Функция dispatch из Redux для отправки действий (actions)
 * @param {boolean} [showError=true] - Флаг, указывающий, нужно ли показывать сообщение об ошибке. По умолчанию - true
 * @returns {void} - ничего не возвращается
 */

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {

  if (showError){
    dispatch(appActions.setAppError({ error: data.messages.length ?  data.messages[0] : "Some error occurred"}));
  }


};
