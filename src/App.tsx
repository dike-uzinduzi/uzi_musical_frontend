// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/themecontext";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/login";
import CreateAccountScreen from "./pages/createaccount";
import AlbumGallery from "./pages/Album";


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/create" element={<CreateAccountScreen/>} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/albums" element={<AlbumGallery/>} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
