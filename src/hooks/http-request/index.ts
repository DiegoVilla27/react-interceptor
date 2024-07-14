import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

/**
 * Http request with AbortController
 * @returns { error, signal, loading, callEndpoint }
 */
export const useHttpRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callEndpoint = async (axiosCall: Promise<AxiosResponse<any, any>>) => {
    setLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: AxiosResponse<any> = await axiosCall;
      setLoading(false);
      return result.data;
    } catch (err: unknown) {
      if (axios.isCancel(err)) {
        setError((err as AxiosError).message);
      } else {
        setError((err as Error).message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    error,
    signal,
    loading,
    callEndpoint
  };
};
