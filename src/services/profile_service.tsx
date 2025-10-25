import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/profiles";

// Create a New Account
const createAccount = async (accountData: any) => {
  try {
    const response = await axios.post(`${API_URL}`, accountData);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

const profileService = {
  createAccount,
};

export default profileService;
