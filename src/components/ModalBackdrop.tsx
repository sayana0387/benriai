import type { ReactNode } from 'react';

interface ModalBackdropProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalBackdrop({ children, onClose }: ModalBackdropProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-[65vw] max-h-[85vh] flex flex-col">
        {children}
      </div>
    </div>
  );
}
