// src/hooks/useRpcErrorHandler.js
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';

export function useRpcErrorHandler() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState(null);

  const handleRpcError = (error) => {
    if (error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
      setIsRateLimited(true);
      setRetryAfter(Date.now() + 30000); // 30 segundos
      
      notifications.show({
        title: 'Límite de solicitudes excedido',
        message: 'Esperando 30 segundos antes de reintentar...',
        color: 'orange',
        autoClose: 5000,
      });

      // Auto reset después de 30 segundos
      setTimeout(() => {
        setIsRateLimited(false);
        setRetryAfter(null);
      }, 30000);
    }
  };

  return {
    isRateLimited,
    retryAfter,
    handleRpcError
  };
}
