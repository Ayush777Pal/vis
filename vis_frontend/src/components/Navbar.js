// import React from 'react'
// import {AppBar, Toolbar, Typography, Button} from '@mui/material'
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const userId = localStorage.getItem('userId');
//   return (
//     <AppBar position='static'>
//         <Toolbar>
//             <Typography variant='h6' sx={{flexGrow:1}}>
//                 Virtual Internship Simulator
//             </Typography>
//             <Button color='inherit' component={Link} to="/">Home</Button>
//             <Button color='inherit' component={Link} to="/login">Login</Button>
//         {userId !== null && (
//           <Button color="inherit" component={Link} to="/progresspage">Progress Page</Button>
//         )}
//         </Toolbar>
//     </AppBar>
// )
// }

// export default Navbar
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getValidUserId } from '../utils/auth'; // ✅ import helper

const Navbar = () => {
  const navigate = useNavigate();
  const userId = getValidUserId(); // null if expired or not logged in

  const handleLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  navigate('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Virtual Internship Simulator
        </Typography>

        {userId ? (
          <>
            <Button color='inherit' component={Link} to="/">Home</Button>
            <Button color='inherit' component={Link} to='/progresspage'>Progress</Button>
            <Button color='inherit' onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>Login</Button>
            <Button color='inherit' component={Link} to='/register'>Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
