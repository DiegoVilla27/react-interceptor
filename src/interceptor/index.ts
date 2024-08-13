import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

const onRequest = (
  req: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (req.url?.includes("assets") || req.headers?.Authorization) return req;
  req.headers["Cabuweb"] = "https://cabuweb.com";

  // Add token to header if exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 500:
        // eslint-disable-next-line no-console
        console.error("A server error has occurred. Please try again later.");
        break;
      default:
        // eslint-disable-next-line no-console
        console.error(`Error: ${status}`, error.response.data);
    }
  } else {
    // eslint-disable-next-line no-console
    console.error("No server response error", error);
    // eslint-disable-next-line no-console
    console.error(
      "The connection to the server could not be established. Please check your connection."
    );
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axios: AxiosInstance): AxiosInstance {
  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(onResponse, onResponseError);
  return axios;
}
