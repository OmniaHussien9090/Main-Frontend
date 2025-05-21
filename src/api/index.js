// import axios from "axios";
// export const API_BASE_URL = "http://localhost:3000";

// export const fetchAllProducts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/products`);
    
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };
// const token = localStorage.getItem("token");

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };
// export const fetchProductById = async (id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/products/${id}`,config);
//     return response.data; // Returns single product
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };


// export const fetchAllCategories = async () => {
//   try {
//     const res = await axios.get(`${API_BASE_URL}/categories`);
//     return(res.data)
//   } catch (error) {
//     console.error("Error fetching Categories:", error);
//     throw error;
//   }
// };

// // Return All Posts
// export const fetchAllPosts = async () => {
//   try {
//     const res = await axios.get(`${API_BASE_URL}/posts`);
//     return(res.data)
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// };
// export const fetchPostById = async (id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
//     console.log(response)
//     return response.data; 

//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };
import { api } from "../axios/axios";
export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/products");
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (error) {
    console.error("Error fetching Categories:", error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  try {
    const res = await api.get("/posts");
console.log(`all posts :`, res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {

    const response = await api.get(`/posts/${id}`);
    console.log(` post :`, response .data);

    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
