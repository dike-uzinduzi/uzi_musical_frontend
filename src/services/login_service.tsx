import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/auth";

// Login
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("userLogin", JSON.stringify(response.data));
    // Add this line to store token separately
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
  }

  return response.data;
};
const userService = {
  login,
};

export default userService;
