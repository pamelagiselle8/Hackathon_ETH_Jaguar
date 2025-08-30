// src/hooks/useContract.js
import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_CONFIG, CATEGORY_MAPPING, REVERSE_CATEGORY_MAPPING } from '../services/contract';

export function useContract() {
  const { address: userAddress } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();

  // Función para obtener todos los posts
  const { data: rawPosts, isLoading: isLoadingPosts, refetch: refetchPosts } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: 'getAllPosts',
  });

  // Transformar posts del blockchain al formato de nuestra UI
  const transformPost = (post, index) => {
    const timestamp = parseInt(post.timestamp.toString());
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    let timeAgo;
    if (diff < 60) timeAgo = 'hace unos segundos';
    else if (diff < 3600) timeAgo = `hace ${Math.floor(diff / 60)} minutos`;
    else if (diff < 86400) timeAgo = `hace ${Math.floor(diff / 3600)} horas`;
    else timeAgo = `hace ${Math.floor(diff / 86400)} días`;

    return {
      id: index,
      title: post.content.substring(0, 50) + (post.content.length > 50 ? '...' : ''),
      content: post.content,
      authorName: `${post.author.substring(0, 6)}...${post.author.substring(38)}`,
      authorAddress: post.author,
      timeAgo,
      category: CATEGORY_MAPPING[post.category] || 'opinion',
      topics: post.topics || [],
      upvotes: 0, // Se obtendrá por separado
      downvotes: 0, // Se obtendrá por separado
      comments: 0, // Se obtendrá por separado
      trending: false
    };
  };

  // Obtener posts transformados
  const posts = rawPosts ? rawPosts.map(transformPost) : [];

  // Función para crear un post
  const createPost = async (content, category, topics = []) => {
    try {
      const categoryNumber = REVERSE_CATEGORY_MAPPING[category];
      
      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: 'post',
        args: [content, categoryNumber, topics]
      });
      
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  // Función para votar
  const vote = async (postId, voteType) => {
    try {
      const functionName = voteType === 'up' ? 'upvote' : 'downvote';
      
      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName,
        args: [postId]
      });
      
      return true;
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  };

  // Función para obtener votos de un post
  const usePostVotes = (postId) => {
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
  };

  // Función para obtener comentarios
  const usePostComments = (postId) => {
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
  };

  return {
    posts,
    isLoadingPosts,
    refetchPosts,
    createPost,
    vote,
    usePostVotes,
    usePostComments,
    userAddress,
    isTransactionPending: isPending,
    transactionHash: hash
  };
}