// src/hooks/useContract.js
import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useEstimateGas,
} from "wagmi";
import {
  CONTRACT_CONFIG,
  CATEGORY_MAPPING,
  REVERSE_CATEGORY_MAPPING,
} from "../services/contract";
import { getFallbackData } from "../services/fallbackData";

export function useContract() {
  const { address: userAddress } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const [useFallback, setUseFallback] = useState(false);

  // Función para obtener todos los posts
  const {
    data: rawPosts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
    error,
  } = useReadContract({
    address: CONTRACT_CONFIG.address,
    abi: CONTRACT_CONFIG.abi,
    functionName: "getAllPosts",
    query: {
      staleTime: 10000, // 10 segundos
      cacheTime: 300000, // 5 minutos
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: 30000, // Refetch automático cada 30 segundos
    },
  });

  // Detectar errores de rate limiting y activar fallback
  useEffect(() => {
    if (
      error?.message?.includes("429") ||
      error?.message?.includes("Too Many Requests")
    ) {
      setUseFallback(true);
      console.warn("Rate limit detectado, usando datos de respaldo");

      // Intentar reconectar después de 1 minuto
      setTimeout(() => {
        setUseFallback(false);
        refetchPosts();
      }, 60000);
    }
  }, [error, refetchPosts]);

  // Transformar posts del blockchain al formato de nuestra UI
  const transformPost = (post, index) => {
    const timestamp = parseInt(post.timestamp.toString());
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    let timeAgo;
    if (diff < 60) timeAgo = "hace unos segundos";
    else if (diff < 3600) timeAgo = `hace ${Math.floor(diff / 60)} minutos`;
    else if (diff < 86400) timeAgo = `hace ${Math.floor(diff / 3600)} horas`;
    else timeAgo = `hace ${Math.floor(diff / 86400)} días`;

    return {
      id: index,
      title: post.title,
      content: post.content,
      // authorName: `${post.author.substring(0, 6)}...${post.author.substring(38)}`,
      authorName: `Usuario ${post.author.substring(
        0,
        6
      )}...${post.author.substring(38)}`,
      authorAddress: post.author,
      timeAgo,
      category: CATEGORY_MAPPING[post.category] || "opinion",
      topics: post.topics || [],
      upvotes: 0, // Se obtendrá por separado
      downvotes: 0, // Se obtendrá por separado
      comments: 0, // Se obtendrá por separado
      trending: false,
    };
  };

  // Obtener posts transformados (con fallback)
  const posts = useFallback
    ? getFallbackData()
    : rawPosts
    ? rawPosts.map(transformPost)
    : [];

  // Indicar si estamos usando datos de respaldo
  const isUsingFallback = useFallback;

  // Función para crear un post
  const createPost = async (content, category, topics = []) => {
    try {
      const categoryNumber = REVERSE_CATEGORY_MAPPING[category];

      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: "post",
        args: [content, categoryNumber, topics],
      });

      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  // Función para estimar gas de votación
  const estimateVoteGas = async (postId, voteType) => {
    try {
      const functionName = voteType === "up" ? "upvote" : "downvote";

      const gasEstimate = await useEstimateGas({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName,
        args: [postId],
      });

      console.log(
        `Gas estimado para ${voteType}vote:`,
        gasEstimate.data?.toString()
      );
      return gasEstimate.data;
    } catch (error) {
      console.error("Error estimando gas:", error);
      return 100000n; // Fallback conservador
    }
  };

  // Función para votar
  const vote = async (postId, voteType) => {
    try {
      const functionName = voteType === "up" ? "upvote" : "downvote";

      // Configuración optimizada de gas
      await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName,
        args: [postId],
        gas: 100000n, // Límite de gas más conservador
        gasPrice: undefined, // Permite que la wallet maneje el precio del gas
      });

      return true;
    } catch (error) {
      console.error("Error voting:", error);

      // Si falla por gas insuficiente, reintentar con más gas
      if (
        error.message?.includes("out of gas") ||
        error.message?.includes("insufficient gas")
      ) {
        console.log("Reintentando con más gas...");
        try {
          await writeContract({
            address: CONTRACT_CONFIG.address,
            abi: CONTRACT_CONFIG.abi,
            functionName,
            args: [postId],
            gas: 150000n, // Gas adicional para el reintento
          });
          return true;
        } catch (retryError) {
          console.error("Error en reintento:", retryError);
          throw retryError;
        }
      }

      throw error;
    }
  };

  // Funcion para hacer un post
  const post = async (title, content, category, topics = []) => {
    try {
      const functionName = "post";

      console.log("se va a llamar a writeContract");
      console.log("args:", [title, content, category, topics]);
      switch (category) {
        case "Queja":
          category = 0;
          break;
        case "Opinion":
          category = 1;
          break;
        case "Sugerencia":
          category = 2;
          break;
        case "Vida universitaria":
          category = 3;
          break;
        default:
          // Lógica para otras categorías
          break;
      }
      const response = await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: "post",
        args: [title, content, category, topics],
      });

      console.log(response);

      return true;
    } catch (error) {
      console.error("Error posting:", error);
      throw error;
    }
  };

  // Función para agregar un comentario
  const addComment = async (postId, content) => {
    try {
      console.log("Agregando comentario al post:", postId, "Contenido:", content);
      
      const response = await writeContract({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: "comment",
        args: [postId, content],
      });

      console.log("Comentario enviado exitosamente:", response);
      return true;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  // Obtener todos los posts de un autor
  const getPostsByAuthor = (authorAddress) => {
    const {
      data: postIds,
      isLoading: isLoadingPostIds,
      error,
      refetch,
    } = useReadContract({
      address: CONTRACT_CONFIG.address,
      abi: CONTRACT_CONFIG.abi,
      functionName: "getPostsByAuthor",
      args: [authorAddress],
      // Solo ejecutar la consulta si se proporciona una dirección de autor
      query: {
        enabled: !!authorAddress,
        staleTime: 15000, // 15 segundos
      },
    });

    return {
      postIds: postIds || [], // Devuelve un array vacío si es undefined
      isLoading: isLoadingPostIds,
      error,
      refetchPostIds: refetch,
    };
  }

  return {
    posts,
    isLoadingPosts: isLoadingPosts && !useFallback,
    refetchPosts,
    createPost,
    vote,
    post,
    addComment,
    estimateVoteGas,
    userAddress,
    isTransactionPending: isPending,
    transactionHash: hash,
    isUsingFallback,
    getPostsByAuthor,
  };
}
