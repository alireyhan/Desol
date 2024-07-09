"use client";
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (response.data.success) {
        window.location.href = '/car';
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#FF5722',
      },
      error: {
        main: '#f44336',
      },
      background: {
        default: '#f9f9f9',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ px: 4, py: 4, bgcolor: 'background.default', boxShadow: '0px 4px 16px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
