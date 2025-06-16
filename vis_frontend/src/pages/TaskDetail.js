import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Typography, Box, Container, Paper, CircularProgress } from '@mui/material';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/tasks/${id}/`)  
      .then(res => {
        setTask(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (!task) {
    return <Typography color="error">Task not found</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>{task.title}</Typography>
        <Typography variant='subtitle1' gutterBottom>Type: {task.task_type}</Typography>
        <Typography variant='body1'>{task.description}</Typography>
      </Paper>
    </Container>
  );
};

export default TaskDetail;
