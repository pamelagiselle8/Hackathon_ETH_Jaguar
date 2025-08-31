import axios from "axios";

const API_URL = import.meta.env.VITE_AI_BACKEND_URL;

export const validarPostAI = async (content) => {
  try {
    console.log("Sending content to AI backend:", content);
    const response = await axios.post(`${API_URL}/procesar`, {
      content
    });
    console.log("Response from AI backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const validarTituloAI = async (content) => {
  try {
    console.log("Sending content to AI backend:", content);
    const response = await axios.post(`${API_URL}/procesartitulos`, {
      content
    });
    console.log("Response from AI backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

