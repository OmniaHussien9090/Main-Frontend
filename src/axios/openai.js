import axios from "axios";

export const askBot = async (question) => {
  const res = await axios.post("http://localhost:3000/chatbot", { question });
  return {
    reply: res.data.reply,
    products: res.data.products,
  };
};
