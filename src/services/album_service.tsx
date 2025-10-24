import axios from "axios";

const API_URL = "https://uzi-muscal-backend.onrender.com/api/albums";

// Get All Albums
const getAllAlbums = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data; 
};

const albumService = {
  getAllAlbums,
};

export default albumService;
