
type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export function Toast({
  message,
  type = "info",
}: ToastProps) {
  const styles = {
    success: "bg-green-500/15 border-green-500/30 text-green-300",
    error: "bg-red-500/15 border-red-500/30 text-red-300",
    info: "bg-gray-800 border-gray-700 text-gray-200",
  };

  return (
    <div
      className={`
        min-w-[280px]
        rounded-lg
        border
        px-4
        py-3
        shadow-xl
        backdrop-blur
        text-sm
        animate-in
        slide-in-from-top
        duration-200
        ${styles[type]}
      `}
    >
      {message}
    </div>
  );
}