import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './profile.css';

export default function Profile({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" className="profile-container">
      <Paper elevation={3} className="profile-paper">
        <Box p={3} display="flex" flexDirection="column" alignItems="center">
          <Avatar className="profile-avatar" />
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" gutterBottom>
                Email: {user.email}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1">
              No user information available.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
