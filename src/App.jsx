// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MenuBar from './components/menubar';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Contact from './components/contact';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialPath, setInitialPath] = useState('/dashboard'); // Ruta predeterminada

  useEffect(() => {
    // Verificar si hay un token almacenado
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    // Recuperar la última ruta visitada
    const savedPath = localStorage.getItem("lastPath");
    if (savedPath) {
      setInitialPath(savedPath);
    }
  }, []);

  return (
    <Router>
      {isLoggedIn && <MenuBar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to={initialPath} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
