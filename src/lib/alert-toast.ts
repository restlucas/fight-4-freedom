import { toast } from "sonner";

type ToastOptions = {
  duration?: number;
  onAutoClose?: () => void;
};

const baseStyle = {
  backgroundColor: "oklch(0.16 0.015 240)",
  border: "1px solid",
};

export const alertToast = {
  success(message: string, options?: ToastOptions) {
    toast.success(message, {
      style: {
        ...baseStyle,
        borderColor: "var(--color-emerald-500)",
        color: "var(--color-emerald-500)",
      },
      duration: options?.duration ?? 3000,
      onAutoClose: options?.onAutoClose,
    });
  },

  error(message: string, options?: ToastOptions) {
    toast.error(message, {
      style: {
        ...baseStyle,
        borderColor: "var(--color-red-500)",
        color: "var(--color-red-500)",
      },
      duration: options?.duration ?? 4000,
      onAutoClose: options?.onAutoClose,
    });
  },

  warning(message: string, options?: ToastOptions) {
    toast(message, {
      style: {
        ...baseStyle,
        borderColor: "var(--color-yellow-500)",
        color: "var(--color-yellow-500)",
      },
      duration: options?.duration ?? 3500,
      onAutoClose: options?.onAutoClose,
    });
  },
};
