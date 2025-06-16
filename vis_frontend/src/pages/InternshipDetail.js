import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../api/axios';
import {Typography, Container, List, ListItem,ListItemText} from '@mui/material'

const InternshipDetail = () => {
  const {id}=useParams();
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    axios.get(`/tasks/?internship=${id}`)
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
  },[id]);
  return (
    <Container sx={{mt:4}}>
      <Typography variant='h5' gutterBottom>Internship Tasks </Typography>
      <List>
        {tasks.map(task=>(
          <ListItem key={task.id} button component={Link} to={`/task/${task.id}`}>
            <ListItemText 
            primary={task.title}
            secondary={`type:${task.task_type}`}/>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default InternshipDetail