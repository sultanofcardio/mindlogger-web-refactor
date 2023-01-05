import { MutationOptions, useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

import { BaseErrorResponse } from "~/shared/utils"

import { ICheckTemporaryPasswordPayload } from "../../model/api.interfaces"
import { Authorization, User } from "../../model/user.schema"
import { authorizationService } from "../authorization.service"

export interface ICheckTemporaryPasswordSuccessResponse {
  message: string
  user: User
  authToken: Omit<Authorization, "scope"> & { temporary: boolean }
}

export type SuccessCheckTemporaryPasswordResponse = AxiosResponse<ICheckTemporaryPasswordSuccessResponse>
export type FailedCheckTemporaryPasswordResponse = AxiosError<BaseErrorResponse & { field: string }>

export const useCheckTemporaryPasswordMutation = (
  options: MutationOptions<
    SuccessCheckTemporaryPasswordResponse,
    FailedCheckTemporaryPasswordResponse,
    ICheckTemporaryPasswordPayload
  > = {},
) => {
  const name = "checkTemporaryMutation"

  return useMutation(
    [name],
    (data: ICheckTemporaryPasswordPayload) => authorizationService.checkTemporaryPassword(data),
    options,
  )
}
