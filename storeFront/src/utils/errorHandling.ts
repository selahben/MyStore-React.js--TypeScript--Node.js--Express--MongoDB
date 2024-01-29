import { AxiosError } from "axios";

export function errorHandling(err: unknown) {
  if (err instanceof Error) {
    return err.message;
  } else if (err instanceof AxiosError) {
    return err.response?.data;
  } else {
    return JSON.stringify(err);
  }
}
