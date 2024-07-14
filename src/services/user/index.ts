import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { environments } from "../../environments";
import { IUsersResponse } from "./interface";

/**
 * Get users list
 * @param options
 * @returns { users as IUser[] }
 */
export const getUsers = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<IUsersResponse>> =>
  axios.get<IUsersResponse>(`${environments.api_url}/?results=10`, options);
