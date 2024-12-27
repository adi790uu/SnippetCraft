import { useRef, useEffect } from "react";
import { WebContainer } from "@webcontainer/api";

export const useWebContainer = () => {
  const webContainerRef = useRef<WebContainer | null>(null);

  useEffect(() => {
    async function initialize() {
      if (!webContainerRef.current) {
        webContainerRef.current = await WebContainer.boot();
      }
    }
    initialize();
  }, []);

  return webContainerRef.current!;
};
