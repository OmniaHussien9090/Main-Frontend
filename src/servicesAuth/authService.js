import axios from 'axios';

// const   BASE_URL = 'https://furniture-backend-production-8726.up.railway.app';
const   BASE_URL = 'http://localhost:3000';


export const Registration=async (userData)=>{
try{
    console.log('Sending data:', userData);

    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
}catch(err){
    console.error("Error during registration:", err);   
    throw err;
}
}

export const Login=async (userData)=>{
try{
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    return response.data;
}catch(err){
    console.error("Login error:", err.response?.data); 
        throw err.response?.data?.message || "Login failed";
}

}


