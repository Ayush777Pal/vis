import React from 'react'
import { Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InternshipDetail from './pages/InternshipDetail';
import {Box} from '@mui/material';
import TaskDetail from './pages/TaskDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProgressPage from './pages/ProgressPage';
const App = () => {
  return (
    <Box>
        <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/internship/:id' element={<InternshipDetail></InternshipDetail>}></Route>
        <Route path='/task/:id' element={<TaskDetail/>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/progresspage' element={<ProgressPage/>}></Route>
      </Routes>
    </Box>
    
    )
}

export default App