import axios from "axios";

const API_URL = import.meta.env.VITE_AI_BACKEND_URL;

const validarPostAI = async (content) => {
  try {
    const response = await axios.post(`${API_URL}/comentario`, {
      content
    });
    console.log("Response from AI backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default validarPostAI;