import { AxiosResponse } from "axios";
import { useEffect } from "react";

/**
 * Async request with useEffect
 * @param asyncFn
 * @param successFn
 * @param returnFn
 * @param dependencies
 */
export const useAsyncEffect = (
  asyncFn: () => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<AxiosResponse<any, any>>,
  successFn: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (res: any) => void,
  returnFn?: (() => void) | null,
  dependencies?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[]
): void => {
  useEffect(() => {
    let isActive = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asyncFn().then((res: any) => {
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
export const useAsync = (
  asyncFn: () => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<AxiosResponse<any, any>>,
  successFn: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (res: any) => void
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncFn().then((res: any) => {
    successFn(res);
  });
};
