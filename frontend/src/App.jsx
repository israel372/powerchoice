// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Dashboard from "./pages/profile/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:profileToken" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;