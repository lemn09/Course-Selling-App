import React from "react";
import { atom, useRecoilState } from 'recoil';
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Box, TextField, FormControlLabel, Switch, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { adminState } from "./adminAtom";


const courseState = atom({
  key: 'courseState',
  default: {
    _id: null,
    title: '',
    description: '',
    imageLink: '',
    price: '',
    published: false,
  },
});


export default function EditCourse() {
  const [isAdmin] = useRecoilState(adminState);

  const [course, setCourse] = useRecoilState(courseState);
  const { courseId } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {

    if (!isAdmin) {
      alert('admin access required');
      navigate('/');
      return;
    }

    if (!localStorage.getItem('token')) {
      navigate('/login');
    }

    async function fetchCourse() {
      try {
        const url = "http://localhost:3000/admin/courses/" + courseId;
        const headers = {
          'Content': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        const response = await axios.get(url, { headers: headers });

        console.log(response.data);

        setCourse({
          _id: response.data.course._id,
          title: response.data.course.title,
          description: response.data.course.description,
          imageLink: response.data.course.imageLink,
          price: response.data.course.price,
          published: response.data.course.published,
        })
      } catch (err) {
        console.log("axios request fail, course not found, " + err);
      }
    }

    fetchCourse();

  }, []);


  return (
    <div style={{ marginBottom: "10%" }}>
      {
        course._id ?
          (
            <div>
              <GrayTopper title={course.title} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "end", padding: "0 2%", alignContent: "center" }}>
                < CourseForm />
                < CourseCard />
              </div>
            </div>
          )
          :
          (
            <CircularProgress />
          )
      }
    </div>

  )
}

function CourseForm() {
  const [course, setCourse] = useRecoilState(courseState);

  async function saveData(e) {
    e.preventDefault();

    try {

      const url = "http://localhost:3000/admin/courses/" + course._id;
      const headers = {
        'Content': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }

      const response = await axios.put(url, course, { headers });

      alert('course updated');
      console.log(response.data);

    } catch (err) {
      console.log('axios put request fail, failed to update course ' + err);
    }
  }

  return (
    <form onSubmit={saveData} className="shadow-lg w-100 bg-white flex flex-col p-4 w-1/4 gap-2 border-slate-50 py-5 mt-80 min-w-min">
      <Typography variant="h5" component="h2" sx={{ marginBottom: "5%" }}>Update Course Details</Typography>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        placeholder="Title"
        size="small"
        value={course.title}
        onChange={(e) => setCourse({ ...course, title: e.target.value })}
      />
      <TextField
        id="outlined-basic" label="Description" variant="outlined" placeholder="Description" size="small"
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <TextField
        id="outlined-basic" label="Image" variant="outlined" placeholder="Image Link" size="small" value={course.imageLink}
        onChange={(e) => setCourse({ ...course, imageLink: e.target.value })}
      />
      <TextField
        id="outlined-basic" label="Price" variant="outlined" placeholder="Price" size="small"
        value={course.price}
        onChange={(e) => setCourse({ ...course, price: e.target.value })}
      />
      <FormControlLabel
        label="Published"
        control={
          <Switch checked={course.published}
            onChange={() => {
              setCourse({ ...course, published: !course.published })
            }}
          />}
      />

      <button
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
        type="submit"
        style={{ width: "60%" }}
      >UPDATE COURSE</button>
    </form >
  )
}

function CourseCard() {

  const [course] = useRecoilState(courseState);

  const cardStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItem: "center",
    width: "22.5rem",
    maxWidth: "380px",
    margin: "2%",
    borderRadius: "5%",
    height: "20rem",
    textAlign: "center",
    marginTop: "5%",
    marginLeft: "20%",
  }


  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        image={course.imageLink}
        sx={{ maxHeight: "50%" }}
        alt={course.title}
      />
      <CardContent >
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

function GrayTopper({ title }) {
  return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
    <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <div>
        <Typography style={{ color: "white", fontWeight: 600, textAlign: "left", paddingLeft: "5%" }} variant="h3" textAlign={"center"}>
          {title}
        </Typography>
      </div>
    </div>
  </div>
}
