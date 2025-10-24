import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/tracks";

// Get All Tracks
const getAllTracks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const trackService = {
  getAllTracks,
};

export default trackService;
