import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Button, Grid, Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [internships, setInternships] = useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    axios.gut('/internships/')
    .then((res)=>{
      setInternships(res.data);
    })
    .catch((err)=>{
      console.error("Error fetching interships: ",err);
    });
},{});
  return (
    <Container sx={{mt:4}}>
      <Typography variant='h4' gutterBottom>
        Available virtual Internship
      </Typography>
      <Grid container spacing={3}>
        {internships.map((internship)=>(
          <Grid item xs={12} sm={6} md={4} key={intership.id}>
            <Card>
              <CardContent>
                <Typography variant='h6'>{intership.title}</Typography>
                <Typography variant='body2' color='text.secondary'>{intership.domain}</Typography>
                <Typography variant='body1' sx={{mt:1}}>{intership.description}</Typography>
                <Button variant='contained'
                sx={{mt:2}}
                onClick={()=>navigate(`/internship/${internship.id}`)}>
                  View Task
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    )
}

export default Home