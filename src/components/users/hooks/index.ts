import { AxiosResponse } from "axios";
import { useState } from "react";
import { useAsyncEffect } from "../../../hooks/async";
import { useHttpRequest } from "../../../hooks/http-request";
import { getUsers } from "../../../services/user";
import { IUser, IUsersResponse } from "../../../services/user/interface";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { loading, error, signal, callEndpoint } =
    useHttpRequest<IUsersResponse>();
  const getUsersReq = async () => await callEndpoint(getUsers({ signal }));
  useAsyncEffect(
    getUsersReq,
    (res: AxiosResponse<IUsersResponse> | undefined) =>
      setUsers(res ? res.data.results : []),
    null,
    []
  );

  return {
    users,
    loading,
    error
  };
};

export default useUsers;
