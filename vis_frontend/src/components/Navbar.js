import React from 'react'
import {AppBar, Toolbar, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userId = localStorage.getItem('userId');
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' sx={{flexGrow:1}}>
                Virtual Internship Simulator
            </Typography>
            <Button color='inherit' component={Link} to="/">Home</Button>
            <Button color='inherit' component={Link} to="/login">Login</Button>
        {userId !== null && (
          <Button color="inherit" component={Link} to="/progresspage">Progress Page</Button>
        )}
        </Toolbar>
    </AppBar>
)
}

export default Navbar