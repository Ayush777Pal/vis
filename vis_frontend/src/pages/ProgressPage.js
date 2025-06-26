import React,{useEffect, useState} from 'react';
import axios from '../api/axios';
import {Box, Typography, Button, Paper, LinearProgress} from '@mui/material';
import jsPDF from 'jspdf'

const ProgressPage = () => {
  const [progress, setProgress] = useState(null);

  useEffect(()=>{
    console.log("Calling /api/progress/...");
    axios.get('/progress/')
    .then(res => setProgress(res.data))
    .catch(err=>console.error(err))
  },[]);
const generateCertificate = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const center = pageWidth / 2;

  // Background
  doc.setFillColor(240, 248, 255); // light blue
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F');

  // Border
  doc.setDrawColor(0);
  doc.setLineWidth(1.2);
  doc.rect(10, 10, pageWidth - 20, 177); // landscape A4 height = 210mm, height = 297mm landscape → 210mm

  // Title
  doc.setFont('times', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(40, 40, 40);
  doc.text('Certificate of Completion', center, 40, { align: 'center' });

  // Subtitle
  doc.setFontSize(16);
  doc.setFont('times', 'italic');
  doc.setTextColor(80, 80, 80);
  doc.text('This is to certify that', center, 60, { align: 'center' });

  // User name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text(progress.user_name, center, 75, { align: 'center' });

  // Internship Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('has successfully completed the internship titled:', center, 85, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(progress.internship_title, center, 95, { align: 'center' });

  // Duration
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.text(`Duration: ${progress.duration}`, center, 105, { align: 'center' });

  // Decorative line
  doc.setDrawColor(150);
  doc.line(40, 115, pageWidth - 40, 115);

  // Issued by
  doc.setFontSize(12);
  doc.text('Issued by GFP private limited', center, 130, { align: 'center' });

  // Signature & Date
  doc.setFont('courier', 'italic');
  doc.text('_________________________', 50, 150);
  doc.text('Authorized Signature', 58, 155);

  const today = new Date().toLocaleDateString();
  doc.setFont('courier', 'normal');
  doc.text(`Date: ${today}`, pageWidth - 60, 155);

  // Save
  doc.save(`${progress.user_name}_certificate.pdf`);
};

  if (!progress) {
    return (
      <Typography>Loading progress....</Typography>
    )
  }
  const percent=(progress.completed_tasks/progress.total_tasks)*100;
  const eligible=percent===100 && progress.evaluation_status==='completed';
  return (
    <Box sx={{ maxWidth:600, mx:'auto', mt:4, p:3}}>
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant='h5' gutterBottom>Internship Progress</Typography>
        <Typography>Total Tasks: {progress.total_tasks}</Typography>
        <Typography>Completed Tasks: {progress.completed_tasks}</Typography>
        <Typography>Evaluation: {progress.evaluation_status}</Typography>
        <Box sx={{my:2}}>
          <LinearProgress variant='determinate' value={percent}></LinearProgress>
          <Typography sx={{mt:1}}>{Math.round(percent)}% completed</Typography>
        </Box>
        {eligible ?(
          <Button variant='contained' color='success' onClick={generateCertificate}>
            Download Ceritificate
          </Button>
        ):(
          <Typography color='error'>
            Cerificate will be available after all tasks are completed and evaluated
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default ProgressPage