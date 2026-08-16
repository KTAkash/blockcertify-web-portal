"use client";

import { useEffect, useRef } from "react";
import { Trash2, PauseCircle, AlertCircle, Loader2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  confirmButtonColor?: "red" | "emerald" | "sky";
  icon?: "delete" | "deactivate" | "default";
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmButtonText,
  cancelButtonText = "Cancel",
  confirmButtonColor = "sky",
  icon = "default",
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const getIcon = () => {
    switch (icon) {
      case "delete":
        return <Trash2 className="w-7 h-7 text-rose-600" />;
      case "deactivate":
        return <PauseCircle className="w-7 h-7 text-amber-600" />;
      default:
        return <AlertCircle className="w-7 h-7 text-sky-600" />;
    }
  };

  const getIconBg = () => {
    switch (icon) {
      case "delete":
        return "#fef2f2";
      case "deactivate":
        return "#fffbeb";
      default:
        return "#eff6ff";
    }
  };

  const getConfirmButtonClasses = () => {
    switch (confirmButtonColor) {
      case "red":
        return "bg-rose-600 hover:bg-rose-700";
      case "emerald":
        return "bg-emerald-600 hover:bg-emerald-700";
      default:
        return "bg-sky-600 hover:bg-sky-700";
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const container = modalRef.current;
    if (!container) return;

    const focusableSelectors = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const focusableElements = Array.from(
      container.querySelectorAll(focusableSelectors),
    ) as HTMLElement[];

    const focusableElementsFiltered = focusableElements.filter(
      (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
    );

    if (focusableElementsFiltered.length > 0) {
      focusableElementsFiltered[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== "Tab" || isLoading) return;
      if (focusableElementsFiltered.length === 0) return;

      const currentIndex = focusableElementsFiltered.indexOf(
        document.activeElement as HTMLElement,
      );
      const lastIndex = focusableElementsFiltered.length - 1;

      if (event.shiftKey) {
        if (currentIndex === 0 || currentIndex === -1) {
          focusableElementsFiltered[lastIndex].focus();
          event.preventDefault();
        }
      } else {
        if (currentIndex === lastIndex || currentIndex === -1) {
          focusableElementsFiltered[0].focus();
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (
        previousActiveElement &&
        typeof previousActiveElement.focus === "function"
      ) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onCancel, isLoading]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      style={{
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (!isLoading && e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full flex flex-col items-center text-center overflow-hidden"
        style={{ maxWidth: 420, padding: "34px 28px 24px" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: getIconBg() }}
        >
          {getIcon()}
        </div>

        <h2
          id="confirm-modal-title"
          className="text-lg font-bold text-slate-800 mb-2"
        >
          {title}
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-8 px-2">
          {message}
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-50"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95 ${getConfirmButtonClasses()} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:${confirmButtonColor === "red" ? "bg-rose-600" : confirmButtonColor === "emerald" ? "bg-emerald-600" : "bg-sky-600"} flex items-center justify-center gap-2`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
