import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './login.css';
import { loginUser } from '../api';

export default function BasicTextFields({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);
      if (result && result.message === "Login exitoso") {
        localStorage.setItem('user', JSON.stringify({ email }));
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        setError(result ? result.error : 'Password or email is incorrect');
      }
    } catch (err) {
      setError('Password or email is incorrect');
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box
        component="form"
        className="form-box"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <h1>Login</h1>
        <div className="form-row">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </div>
        <div className="form-button">
          <Button variant="contained" onClick={handleLogin}>Log In</Button>
        </div>
      </Box>
    </Container>
  );
}