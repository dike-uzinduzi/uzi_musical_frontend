import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/profiles";

// ✅ Get authentication token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Create a New Account
const createAccount = async (accountData: any) => {
  try {
    const response = await axios.post(`${API_URL}`, accountData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get Current User Profile (/api/profiles/me)
const getMyProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Update Current User Profile (/api/profiles/me)
const updateMyProfile = async (profileData: any) => {
  try {
    const response = await axios.put(`${API_URL}/me`, profileData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Delete Current User Profile (/api/profiles/me)
const deleteMyProfile = async () => {
  try {
    const response = await axios.delete(`${API_URL}/me`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get Profile by ID (/api/profiles/{id})
const getProfileById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const profileService = {
  createAccount,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getProfileById,
};

export default profileService;
