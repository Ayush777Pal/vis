import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Typography, Box, Container, Paper, CircularProgress, TextField, Button } from '@mui/material';
import { getValidUserId } from '../utils/auth';

const TaskDetail = () => {
  const { id } = useParams(); // task ID from route
  const [task, setTask] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [file, setFile] = useState(null);
  const [submission, setSubmission] = useState(null);
  const userId = getValidUserId();

  // 🔁 Fetch Task
  useEffect(() => {
    setLoading(true);
    setTask(null);         // ✅ Reset task
    setSubmission(null);   // ✅ Reset submission
    setAnswer('');         // ✅ Clear answer
    setFile(null);         // ✅ Clear file

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

  // 🔁 Fetch Submission
  useEffect(() => {
    // if (!userId || !task?.id) return;
    if (!userId) return;
    axios.get(`/submissions/?user=${userId}&task=${id}`)
      .then(res => {
        if (res.data.length > 0) {
          setSubmission(res.data[0]);
        } else {
          setSubmission(null); // ✅ Ensure it's reset if no submission found
        }
      })
      .catch(err => {
        console.error("Failed to fetch submission:", err);
      });
  }, [id, userId]);

  // 🔁 Handle submit
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('task', task.id);
    formData.append('user', userId);
    if (task.task_type === 'upload') {
      formData.append('file', file);
    } else {
      formData.append('answer', answer);
    }

    try {
      const res = await axios.post('/submissions/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Submission successful!");
      setSubmission(res.data); // ✅ Update UI with new submission
    } catch (err) {
      const error = err?.response?.data?.error || 'Submission failed!';
      alert(error);
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
          {['oneword', 'code'].includes(task.task_type) && (
            <TextField
              label={task.task_type === 'oneword' ? 'Your Answer' : 'Your Code'}
              fullWidth
              multiline={task.task_type === 'code'}
              rows={task.task_type === 'code' ? 6 : 1}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          {task.task_type === 'upload' && (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: '16px' }}
            />
          )}

          <Button variant="contained" onClick={handleSubmit}>Submit Task</Button>

        {submission && (
          <Box mt={2}>
            {submission.submitted_answer && task.task_type==='oneword'&&(
              <Typography variant="body1"><strong>Answer submitted:</strong> {submission.submitted_answer}</Typography>
            )}
            
            {/* {submission.evaluated === true && ( */}
              <Box>
                <Typography variant="body1"><strong>Marks Awarded:</strong> {submission.marks_awarded}</Typography>
                <Typography variant="body1"><strong>Feedback:</strong> {submission.feedback}</Typography>
              </Box>
            {/* )} */}
          </Box>
        )}

        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetail;
