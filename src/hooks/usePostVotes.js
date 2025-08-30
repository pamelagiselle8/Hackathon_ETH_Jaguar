// src/hooks/usePostVotes.js
import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_CONFIG } from '../services/contract';

export function usePostVotes(postId) {
  const { address: userAddress } = useAccount();

  const { data: votes } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'getVotes',
    args: [postId],
    enabled: postId !== undefined
  });

  const { data: userVote } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'myVote',
    args: [postId],
    enabled: postId !== undefined && !!userAddress
  });

  return {
    upvotes: votes ? parseInt(votes[0].toString()) : 0,
    downvotes: votes ? parseInt(votes[1].toString()) : 0,
    userVote: userVote ? parseInt(userVote.toString()) : 0
  };
}
