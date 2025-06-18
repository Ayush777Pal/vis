import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Typography, Box, Container, Paper, CircularProgress, TextField, Button } from '@mui/material';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [file, setFile] = useState(null);

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

  //here how to handle submits
  const handleSubmit = async ()=>{
    const formData = new FormData();
    formData.append('task', task.id);
    formData.append('user',1);
    if (task.task_type === 'upload') {
      formData.append('file', file);
    }else{
      formData.append('answer', answer);
    }

    try{
      //need to understand this
      await axios.post('/submissions/', formData,{
        headers:{'Content-Type':'multipart/form-data'}
      });
      alert("Submission succesfull !");
    }catch(err){
      console.error(err);
      alert("Submission failed! ");
    }
  };

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

        <Box mt={4}>
          {task.task_type === 'mcq' && (
            <TextField
             label="Your Answer"
             fullWidth
             value={answer}
             onChange={(e)=> setAnswer(e.target.value)}
             sx={{mb:2}}
            >
            </TextField>
          )}

          {task.task_type === 'code' && (
            <TextField
            label="Your Code"
            fullWidth
            multiline
            rows={6}
            value={answer}
            onChange={(e)=> setAnswer(e.target.value)}
            sx={{mb:2}}
            >
            </TextField>
          )}
            {task.task_type === 'upload' && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: '16px' }}
            />
          )}
          <Button variant='contained' onClick={handleSubmit}>Submit Task</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetail;
