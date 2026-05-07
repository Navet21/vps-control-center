import { useToastContext } from "../components/ui/feedback/ToastProvider";

export function useToast() {
  return useToastContext();
}