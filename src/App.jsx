import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuBar from './components/menubar';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Contact from './components/contact';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn && <MenuBar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
