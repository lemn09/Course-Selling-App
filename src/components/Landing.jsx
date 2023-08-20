
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    function explore() {
        navigate('/courses');
    }

    return <div
        style={{
            backgroundImage: "url(/images/bgimg.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            minHeight: "60vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            overflowX: "hidden",
            padding: "40px",
        }}
    >
        <div style={{ width: "50%" }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '40px', fontFamily: "Quicksand" }}>
                Welcome to Course Selling App
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "20px", fontFamily: "Quicksand" }}>
                Discover a world of knowledge and skills with our expertly crafted
                courses. Whether you're looking to advance your career or explore new
                interests, we have a course for you.
            </Typography>
            <Button variant="contained" onClick={explore} style={{ backgroundColor: "#212121", color: "#fff", fontFamily: "Quicksand" }}>
                Explore
            </Button>
        </div>
    </div>
}

export default Landing;