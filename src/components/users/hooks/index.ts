import { useState } from "react";
import { useAsyncEffect } from "../../../hooks/async";
import { useHttpRequest } from "../../../hooks/http-request";
import { getUsers } from "../../../services/user";
import { IUser, IUsersResponse } from "../../../services/user/interface";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { loading, error, signal, callEndpoint } = useHttpRequest();
  const getUsersReq = async () => await callEndpoint(getUsers({ signal }));
  useAsyncEffect(
    getUsersReq,
    (res: IUsersResponse) => setUsers(res.results),
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
