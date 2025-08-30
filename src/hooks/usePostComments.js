// src/hooks/usePostComments.js
import { useReadContract } from 'wagmi';
import { CONTRACT_CONFIG } from '../services/contract';

export function usePostComments(postId) {
  const { data: commentsCount } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'totalComments',
    args: [postId],
    enabled: postId !== undefined
  });

  const { data: comments } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'getComments',
    args: [postId],
    enabled: postId !== undefined
  });

  return {
    count: commentsCount ? parseInt(commentsCount.toString()) : 0,
    comments: comments || []
  };
}
