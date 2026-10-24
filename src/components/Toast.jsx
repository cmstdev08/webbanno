import React from 'react';
import { useToast } from '../context/ToastContext';
import { Check, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <Check size={16} />}
            {toast.type === 'info' && <Info size={16} />}
            {toast.type === 'error' && <AlertTriangle size={16} />}
          </div>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: 'var(--text-light)', padding: '2px', display: 'flex' }}
            aria-label="Đóng"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}

