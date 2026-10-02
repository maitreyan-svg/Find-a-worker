import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 max-w-sm pointer-events-auto border border-white/10">
        <span
          className="material-symbols-outlined text-secondary-fixed text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
