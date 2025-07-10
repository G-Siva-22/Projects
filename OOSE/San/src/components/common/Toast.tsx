import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-xs sm:max-w-sm md:max-w-md">
      {toasts.map((toast) => {
        let icon;
        let bgColor;
        
        switch (toast.type) {
          case 'success':
            icon = <CheckCircle className="h-5 w-5 text-green-400" />;
            bgColor = 'bg-green-50 border-green-400';
            break;
          case 'error':
            icon = <AlertCircle className="h-5 w-5 text-red-400" />;
            bgColor = 'bg-red-50 border-red-400';
            break;
          case 'warning':
            icon = <AlertTriangle className="h-5 w-5 text-yellow-400" />;
            bgColor = 'bg-yellow-50 border-yellow-400';
            break;
          case 'info':
          default:
            icon = <Info className="h-5 w-5 text-blue-400" />;
            bgColor = 'bg-blue-50 border-blue-400';
            break;
        }
        
        return (
          <div
            key={toast.id}
            className={`${bgColor} border p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out flex items-start`}
            role="alert"
          >
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm text-gray-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 ml-auto -mt-1 -mr-1 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;