import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/auth";

// Login
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  // Store login data in localStorage if available
  if (response.data) {
    localStorage.setItem("userLogin", JSON.stringify(response.data));
  }

  return response.data;
};

const userService = {
  login,
};

export default userService;
