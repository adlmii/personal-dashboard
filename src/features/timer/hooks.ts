import { useEffect } from "react";
import { useTimerStore } from "./store";

export function useTimerTick() {
  const { status, tick } = useTimerStore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    // Kalau status lagi 'running', jalankan interval 1 detik
    if (status === 'running') {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    // Bersihkan interval kalau pause/stop
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, tick]);
}