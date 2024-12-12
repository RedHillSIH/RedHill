import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Complaints from "./pages/Complaints";
import Login from "./pages/Login";
import dotenv from 'dotenv';
import Register from "./pages/Register";
import LoginEmp from "./pages/LoginEmp";
// dotenv.config();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/complains" element={<Complaints />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emp/log" element={<LoginEmp />} />





      </Routes>
    </Router>
  );
}

export default App;
