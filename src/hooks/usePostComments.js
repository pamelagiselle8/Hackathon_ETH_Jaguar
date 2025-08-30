// src/hooks/usePostComments.js
import { useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '../services/contract';

export function usePostComments(postId) {
  const { data: commentsCount } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'totalComments',
    args: [postId],
    enabled: postId !== undefined,
    query: {
      staleTime: 60000, // 1 minuto
      cacheTime: 300000, // 5 minutos
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  });

  const { data: comments } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'getComments',
    args: [postId],
    enabled: postId !== undefined,
    query: {
      staleTime: 60000, // 1 minuto
      cacheTime: 300000, // 5 minutos
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  });

  return {
    count: commentsCount ? parseInt(commentsCount.toString()) : 0,
    comments: comments || []
  };
}
