import { useEffect, useState } from "react";

export function useDelayedLoader(isLoading: boolean, delay = 300) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout = null as unknown as NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => setShowLoader(true), delay);
    } else {
      setShowLoader(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoader;
}
