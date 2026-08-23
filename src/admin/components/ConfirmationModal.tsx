'use client';

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_30px_60px_rgba(30,14,66,0.35)]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            {title}
          </h2>
          <p className="mt-2 text-sm text-[#7A7290]">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-[10px] border border-[#E4DEF2] bg-white px-4 py-3 text-sm font-semibold text-[#7A7290] transition-colors hover:bg-[#E4DEF2] font-[family-name:var(--font-display)]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-[10px] px-4 py-3 text-sm font-semibold text-white transition-colors font-[family-name:var(--font-display)] ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#5B21B6] hover:bg-[#4C1D95]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
