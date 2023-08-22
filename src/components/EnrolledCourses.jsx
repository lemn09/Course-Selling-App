import React from 'react';
import { useRecoilState } from 'recoil';
import { adminState } from './adminAtom';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, Box, CardMedia } from '@mui/material';
import axios from 'axios';
import BaseURL from './BaseURL';

export default function EnrolledCourses() {

  const navigate = useNavigate();
  const [isAdmin] = useRecoilState(adminState);
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    if (isAdmin) {
      alert('Login as a user first');
      navigate('/');
      return;
    }

    async function fetchEnrolledCourses() {
      const url = BaseURL + '/users/purchasedCourses';
      const headers = {
        'Content': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }

      try {
        const res = await axios.get(url, { headers });

        setCourses(res.data.purchasedCourses);
        console.log(res.data.purchasedCourses);
      } catch {
        alert('course fetch failed, retry');
        navigate('/');
        return;
      } finally {
        setLoading(false);
      }
    }

    fetchEnrolledCourses();

  }, [])

  return (
    <div>
      {
        loading ?
          (
            <div>
              <CircularProgress />
            </div>
          ) :
          (
            courses.length ? (
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
              }}>
                {courses.map((course) => {
                  return <CourseCard course={course} />
                })}
              </div>
            ) :
              (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: "5%"
                }}
                >
                  <Typography variant="h4" sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}>Begin Your Journey: No Courses Enrolled Yet, Enroll Today!</Typography>
                </div >
              )
          )
      }
    </div >
  )
}

function CourseCard({ course }) {

  const cardStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItem: "center",
    width: "22.5rem",
    maxWidth: "380px",
    margin: "2%",
    borderRadius: "5%",
    textAlign: "center",
  }


  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        image={course.imageLink}
        alt={course.title}
      />
      <CardContent
      >
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" component="h2">
            {course.title}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {course.description}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" color="primary">
            ${course.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}