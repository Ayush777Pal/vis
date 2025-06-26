// import React from 'react'
// import { Route, Routes} from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import InternshipDetail from './pages/InternshipDetail';
// import {Box} from '@mui/material';
// import TaskDetail from './pages/TaskDetail';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProgressPage from './pages/ProgressPage';
// const App = () => {
//   return (
//     <Box>
//         <Navbar></Navbar>
//       <Routes>
//         <Route path='/' element={<Home></Home>}></Route>
//         <Route path='/internship/:id' element={<InternshipDetail></InternshipDetail>}></Route>
//         <Route path='/task/:id' element={<TaskDetail/>}></Route>
//         <Route path='/login' element={<Login />} />
//         <Route path='/Register' element={<Register/>}></Route>
//         <Route path='/progresspage' element={<ProgressPage/>}></Route>
//       </Routes>
//     </Box>
    
//     )
// }

// export default App
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InternshipDetail from './pages/InternshipDetail';
import { Box } from '@mui/material';
import TaskDetail from './pages/TaskDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProgressPage from './pages/ProgressPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const userId = localStorage.getItem('userId');

  return (
    <Box>
      <Navbar />
      <Routes>
        {/* 👇 Default redirect to login if not logged in */}
        <Route path="/" element={
          userId ? <Home /> : <Navigate to="/login" replace />
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/internship/:id" element={
          <PrivateRoute><InternshipDetail /></PrivateRoute>
        } />
        <Route path="/task/:id" element={
          <PrivateRoute><TaskDetail /></PrivateRoute>
        } />
        <Route path="/progresspage" element={
          <PrivateRoute><ProgressPage /></PrivateRoute>
        } />
      </Routes>
    </Box>
  );
};

export default App;
