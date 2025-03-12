// src/components/login.jsx

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './login.css';
import { loginUser } from '../api';

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = async () => {
        try {
            const result = await loginUser(email, password);
            if (result && result.token) {
                localStorage.setItem("token", result.token); // Guardar token
                localStorage.setItem("user", JSON.stringify({ email }));
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                setError(result ? result.error : 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error en el login');
        }
    };

    return (
        <Container maxWidth="sm" className="container">
            <Box component="form" className="form-box">
                <h1>Login</h1>
                <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={!!error} helperText={error} />
                <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!error} helperText={error} />
                <Button variant="contained" onClick={handleLogin}>Log In</Button>
            </Box>
        </Container>
    );
}
