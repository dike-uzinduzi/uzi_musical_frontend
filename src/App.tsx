// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/themecontext";
import HomeScreen from "./pages/Home";
import Plaques from "./pages/Plaques";
import ProfileScreen from "./pages/Profil";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/plaques" element={<Plaques />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
