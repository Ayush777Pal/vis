import React, { useState } from 'react';
import axios from '../api/axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post('/token/', {
        username,
        password
      });
      const userRes = await axios.get('/me/', {
      headers: {
        Authorization: `Bearer ${res.data.access}`
      }
    });
    // localStorage.setItem('userId', userRes.data.id); 
      const userId=userRes.data.id;
      const expiryTime = Date.now() + 5*60*60*1000;
      const userData = {
        value:userId,
        expiry:expiryTime
      }
      localStorage.setItem('userId', JSON.stringify(userData)); 
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      alert('Login successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link to="/register" underline="hover">
            Register here
          </Link>
          </Typography>  
        </Box>
    </Container>
  );
};

export default Login;
