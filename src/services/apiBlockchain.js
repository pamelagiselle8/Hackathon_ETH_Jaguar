import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState, useCallback } from "react";
import { CONTRACT_CONFIG } from "./contract";

/**
 * Hook para manejar las operaciones de votación en posts
 * @param {Object} options - Opciones de configuración
 * @param {Function} options.onSuccess - Callback ejecutado cuando la transacción es exitosa
 * @param {Function} options.onError - Callback ejecutado cuando hay un error
 * @param {Function} options.onTransactionStart - Callback ejecutado cuando inicia la transacción
 * @returns {Object} Objeto con funciones y estados para manejar votos
 */
export function useVoteAPI(options = {}) {
  const { onSuccess, onError, onTransactionStart } = options;

  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();
  const {
    isLoading: isMining,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
    onSuccess: () => {
      setCurrentOperation(null);
      onSuccess?.(hash);
    },
    onError: (error) => {
      setCurrentOperation(null);
      setError(error.message || "Error en la transacción");
      onError?.(error);
    },
  });

  const [error, setError] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);

  /**
   * Función genérica para realizar operaciones de voto
   * @param {string} operation - Tipo de operación: "upvote", "downvote", "unvote"
   * @param {number|bigint} postId - ID del post
   * @returns {Promise<string|null>} Hash de la transacción o null si falla
   */
  const executeVote = useCallback(
    async (operation, postId) => {
      if (isPending || isMining) {
        throw new Error("Ya hay una transacción en progreso");
      }

      setError(null);
      setCurrentOperation(operation);
      onTransactionStart?.({ operation, postId });

      try {
        const result = writeContract({
          ...CONTRACT_CONFIG,
          functionName: operation,
          args: [postId],
        });

        return result;
      } catch (err) {
        const errorMessage =
          err?.shortMessage || err?.message || "Error desconocido";
        setError(errorMessage);
        setCurrentOperation(null);
        onError?.(err);
        throw new Error(errorMessage);
      }
    },
    [isPending, isMining, writeContract, onSuccess, onError, onTransactionStart]
  );

  /**
   * Dar upvote a un post
   * @param {number|bigint} postId - ID del post
   * @returns {Promise<string>} Hash de la transacción
   */
  const upvotePost = useCallback(
    async (postId) => {
      return executeVote("upvote", postId);
    },
    [executeVote]
  );

  /**
   * Dar downvote a un post
   * @param {number|bigint} postId - ID del post
   * @returns {Promise<string>} Hash de la transacción
   */
  const downvotePost = useCallback(
    async (postId) => {
      return executeVote("downvote", postId);
    },
    [executeVote]
  );

  /**
   * Remover voto de un post
   * @param {number|bigint} postId - ID del post
   * @returns {Promise<string>} Hash de la transacción
   */
  const unvotePost = useCallback(
    async (postId) => {
      return executeVote("unvote", postId);
    },
    [executeVote]
  );

  /**
   * Cancelar la operación actual (solo funciona antes de que se mine)
   */
  const cancelOperation = useCallback(() => {
    if (isPending && !isMining) {
      setCurrentOperation(null);
      setError("Operación cancelada por el usuario");
    }
  }, [isPending, isMining]);

  return {
    // Funciones principales
    upvotePost,
    downvotePost,
    unvotePost,
    cancelOperation,

    // Estados
    isPending,
    isMining,
    isSuccess,
    isError,
    error,
    currentOperation,
    transactionHash: hash,

    // Estados derivados
    isLoading: isPending || isMining,
    canVote: !isPending && !isMining,
  };
}

/**
 * API simplificada para operaciones de voto sin hooks
 * Útil para llamadas imperativas desde event handlers
 */
export class VoteAPI {
  constructor(writeContract) {
    this.writeContract = writeContract;
    this.pendingOperations = new Set();
  }

  /**
   * Ejecutar una operación de voto
   * @param {string} operation - "upvote", "downvote", "unvote"
   * @param {number|bigint} postId - ID del post
   * @returns {Promise<Object>} Resultado de la operación
   */
  async vote(operation, postId) {
    const operationKey = `${operation}-${postId}`;

    if (this.pendingOperations.has(operationKey)) {
      throw new Error(
        `Ya hay una operación ${operation} pendiente para este post`
      );
    }

    this.pendingOperations.add(operationKey);

    try {
      const result = await this.writeContract({
        ...CONTRACT_CONFIG,
        functionName: operation,
        args: [postId],
      });

      return {
        success: true,
        hash: result,
        operation,
        postId,
      };
    } catch (error) {
      return {
        success: false,
        error: error?.shortMessage || error?.message || "Error desconocido",
        operation,
        postId,
      };
    } finally {
      this.pendingOperations.delete(operationKey);
    }
  }

  async upvote(postId) {
    return this.vote("upvote", postId);
  }

  async downvote(postId) {
    return this.vote("downvote", postId);
  }

  async unvote(postId) {
    return this.vote("unvote", postId);
  }
}

/**
 * Función utilitaria para crear una instancia de VoteAPI
 * @param {Function} writeContract - Función writeContract de wagmi
 * @returns {VoteAPI} Instancia de la API
 */
export function createVoteAPI(writeContract) {
  return new VoteAPI(writeContract);
}

/**
 * Hook para obtener estadísticas de votación
 * @param {number|bigint} postId - ID del post
 * @returns {Object} Estadísticas del post
 */
export function useVoteStats(postId) {
  // Esta función se integraría con tu hook usePostVotes existente
  // La incluyo aquí para completar la API
  return {
    upvotes: 0,
    downvotes: 0,
    userVote: 0, // -1: downvote, 0: no vote, 1: upvote
    totalVotes: 0,
    ratio: 0, // upvotes / (upvotes + downvotes)
  };
}

// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { useState, useCallback } from "react";
// import { CONTRACT_CONFIG } from "./contract";

// function upvote(postId) {
//   const { writeContract } = useWriteContract();

//   const tx = writeContract(
//     {
//       ...CONTRACT_CONFIG,
//       functionName: "upvote",
//       args: [postId],
//     },
//     {
//       onError: (error) => {
//         console.error("Error en upvote:", error);
//       },
//       onSuccess: (data) => {
//         console.log("Voto registrado exitosamente:", data);
//       },
//     }
//   );
//   return tx;
// }

// export { upvote };
