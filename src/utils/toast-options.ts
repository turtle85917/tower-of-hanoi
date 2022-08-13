import { ToastOptions } from "react-hot-toast";

/**
 * 토스트 옵션
 */
export const options: ToastOptions = {
  style: {
    borderRadius: "1em",
    background: "#333",
    color: "#fff",
    userSelect: "none"
  },
  position: "top-right",
  duration: 1500
}