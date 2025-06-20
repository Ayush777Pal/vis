import React,{useState} from 'react';
import axios from '../api/axios';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import { Link } from 'react-router-dom';


const Register = () => {
    const [form, setForm] = useState({ username:'', email:'', password:''});
    const handleChange =(e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const handleSubmit = async() =>{
        try{
            await axios.post('/register/', form);
            alert("Registration successful ! Please login");
        }catch(err){
            console.error(err);
            alert("Registration failed.");
        }
    };
    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                    <Typography variant='h5' gutterBottom>Register</Typography>
                    <TextField label="Username" name="username" fullWidth margin='normal' onChange={handleChange}></TextField>
                    <TextField label="Email" name="email" fullWidth margin='normal' onChange={handleChange}/>
                    <TextField label="Password" name="password" type='password' fullWidth margin='normal' onChange={handleChange}/>
                    <Button variant='contained' onClick={handleSubmit}>Register</Button>
                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link to="/login" underline="hover">
                            Login here
                        </Link>
                    </Typography>  
          
            </Box>
        </Container>
    )
}

export default Register