// src/components/menubar.jsx

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

export default function MenuBar({ isLoggedIn }) {
  const location = useLocation();

  React.useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastPath", location.pathname); // Guardar la ruta actual
    }
  }, [location, isLoggedIn]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        {isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
