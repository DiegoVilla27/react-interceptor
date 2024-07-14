import axios from "axios";
import { environments } from "../../environments";
import { IUsersResponse } from "./interface";

/**
 * Get users list
 * @param options
 * @returns { users as IUser[] }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsers = (options?: any) =>
  axios.get<IUsersResponse>(`${environments.api_url}/?results=10`, options);
