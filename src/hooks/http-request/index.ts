import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface HttpRequestResult<T> {
  error: string | null;
  signal: AbortSignal;
  loading: boolean;
  callEndpoint: (
    axiosCall: Promise<AxiosResponse<T>>
  ) => Promise<AxiosResponse<T> | undefined>;
}

/**
 * Http request with AbortController
 * @returns { error, signal, loading, callEndpoint }
 */
export const useHttpRequest = <T>(): HttpRequestResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const callEndpoint = async (
    axiosCall: Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T> | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const result: AxiosResponse<T> = await axiosCall;
      setLoading(false);
      return result;
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
