import { AxiosResponse } from "axios";
import { DependencyList, useEffect } from "react";

type AsyncFn<T> = () => Promise<AxiosResponse<T> | undefined>;
type SuccessFn<T> = (res: AxiosResponse<T> | undefined) => void;
type ReturnFn = () => void;

/**
 * Async request with useEffect
 * @param asyncFn
 * @param successFn
 * @param returnFn
 * @param dependencies
 */
export const useAsyncEffect = <T>(
  asyncFn: AsyncFn<T>,
  successFn: SuccessFn<T>,
  returnFn?: ReturnFn | null,
  dependencies?: DependencyList
): void => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((res) => {
      if (isActive) successFn(res);
    });
    return () => {
      returnFn && returnFn();
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

/**
 * Async request
 * @param asyncFn
 * @param successFn
 */
export const useAsync = <T>(
  asyncFn: AsyncFn<T>,
  successFn: SuccessFn<T>
): void => {
  asyncFn().then((res) => {
    successFn(res);
  });
};
