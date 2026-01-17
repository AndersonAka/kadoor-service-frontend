'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'danger', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Attendre l'animation de sortie
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'fa-check-circle';
      case 'danger':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-bell';
    }
  };

  const getBackgroundStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          borderLeft: '4px solid #155724',
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
          borderLeft: '4px solid #721c24',
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
          borderLeft: '4px solid #856404',
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
          borderLeft: '4px solid #0c5460',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
          borderLeft: '4px solid #7f1d1d',
        };
    }
  };

  return (
    <div
      className={`toast align-items-center text-white border-0 mb-2 ${show ? 'show' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        ...getBackgroundStyle(),
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(100%)',
        transition: 'all 0.3s ease-in-out',
        minWidth: '300px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="d-flex align-items-center p-3">
        <i className={`fa ${getIcon()} me-3`} style={{ fontSize: '1.5rem' }}></i>
        <div className="toast-body flex-grow-1 p-0" style={{ fontSize: '0.95rem' }}>
          {toast.message}
        </div>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
