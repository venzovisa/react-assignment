import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export function useLoadingStatus(slice: keyof RootState) {
  const status = useSelector((state: RootState) => state[slice]?.status);
  const error = useSelector((state: RootState) => state[slice]?.error);

  return {
    isLoading: status === "loading",
    isSuccess: status === "succeeded",
    isError: status === "failed",
    error,
  };
}
