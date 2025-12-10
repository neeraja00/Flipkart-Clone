import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Notification = () => {
  const { state, dispatch } = useAppContext();
  const { notification } = state;

  if (!notification) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[notification.type] || 'bg-gray-500';

  return (
    <div 
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-md shadow-lg z-50`}
      onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
    >
      <div className="flex items-center">
        <span className="mr-2">
          {notification.type === 'success' && '✓ '}
          {notification.type === 'error' && '✕ '}
          {notification.type === 'info' && 'ℹ '}
          {notification.type === 'warning' && '⚠ '}
        </span>
        {notification.message}
        <button className="ml-4 text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;