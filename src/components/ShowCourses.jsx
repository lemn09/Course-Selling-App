import React from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from 'recoil';
import { adminState } from "./adminAtom";

const coursesState = atom({
    key: "coursesState", // Unique ID (with respect to other atoms/selectors)
    default: [], // Initial value (an empty array for your case)
});

function ShowCourses() {
    const [courses, setCourses] = useRecoilState(coursesState);
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate();

    React.useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        const fetchCourses = async () => {
            try {

                const token = localStorage.getItem('token');
                if (token) {
                    const url = "http://localhost:3000/admin/courses";
                    const headers = {
                        'Content': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }

                    const response = await axios.get(url, { headers: headers });

                    setCourses(response.data.courses);
                } else {
                    console.log("Token not available, please login first");
                    return;
                }
            } catch (err) {
                if (err.response && err.response.status >= 400 && err.response.status < 500) {
                    alert("Error fetching courses, login again");
                    console.log(err.response.data.message);
                    navigate('/');
                } else {
                    console.log("Server error: " + err);
                }
            }
            setLoading(false);
        }
        fetchCourses();

    }, [])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return (

        <div>
            {
                loading ?
                    (<CircularProgress />) :
                    (

                        <div style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap",
                                margin: "2% auto",
                            }}>

                            {
                                courses.map((course) => {
                                    return <CourseCard course={course} />
                                })
                            }

                        </div>
                    )
            }
        </div>

    )
}


function CourseCard({ course }) {

    const [courses, setCourses] = useRecoilState(coursesState);

    const navigate = useNavigate();
    const cardStyle = {
        display: "flex",
        // flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
        width: "22.5rem",
        maxWidth: "380px",
        margin: "2%",
        borderRadius: "5%",
        height: "25rem",
        textAlign: "center",
        // overflowY: "visible",
    }

    function editCourse() {
        navigate(`/courses/${course._id}`);
    }

    async function deleteCourse() {
        const id = course._id;
        const url = `http://localhost:3000/admin/courses/${id}`;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        try {
            const res = await axios.delete(url, { headers: headers });

            alert('Course deleted successfully');
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                alert("Error deleting course, login again");
                console.log(err.response.data.message);
                navigate('/');
            } else {
                console.log("Server error: " + err);
            }
        }

        const updatedCourses = courses.filter((c) => c._id !== course._id);
        setCourses(updatedCourses);
    }

    const [isAdmin] = useRecoilState(adminState);

    async function enrollCourse() {


        // logic to check if already enrolled before enrolling
        try {

            const url = "http://localhost:3000/users/course/" + course._id;
            const headers = {
                'Content': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }

            const res = await axios.get(url, { headers });

            if (res.data.enrolled) {
                alert('Already enrolled');
                return;
            }

        } catch (err) {
            alert('Error enrolling, try again');
            console.log("axios request fail: " + err);
            return;
        }

        // logic to enroll/purchase a course
        try {
            const url = "http://localhost:3000/users/courses/" + course._id;
            const headers = {
                'Content': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }

            const res = await axios.post(url, {}, { headers });

            console.log(res.data.message);
            alert(res.data.message);
        } catch (err) {
            alert("Cannot Load Enrolled Courses, Try Again");
            console.log("axios request fail: " + err);
        }
    }

    const maxTitleLength = 40;
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
                        {/* {course.description} */}
                        {course.description.length > maxTitleLength
                            ? course.description.substring(0, maxTitleLength) + '...'
                            : course.descirption}
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" color="primary">
                        ${course.price}
                    </Typography>
                </Box>

                {
                    isAdmin ? (
                        <div

                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",

                            }}
                        >
                            <Button variant="contained" onClick={editCourse}>Edit</Button>
                            <Button variant="contained" onClick={deleteCourse}>Delete</Button>
                        </div>
                    ) :
                        (
                            <div>
                                <Button variant="contained" onClick={enrollCourse}>Enroll</Button>
                            </div>
                        )
                }
            </CardContent>
        </Card >
    )
}

export default ShowCourses;