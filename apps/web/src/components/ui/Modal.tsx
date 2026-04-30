import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export function Modal({
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      {/* CARD */}
      <div className="card w-full max-w-md">

        {/* HEADER */}
        {title && (
          <h2 className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}

        {/* BODY */}
        <div className="text-sm text-gray-300 mb-6">
          {children}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="button button-secondary"
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="button button-danger"
            disabled={loading}
          >
            {loading ? "Procesando..." : confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}