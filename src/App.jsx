import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import AddCourse from './components/AddCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Appbar from './components/Appbar';
import EditCourse from './components/EditCourse';
import Footer from './components/Footer'
import EnrolledCourses from './components/EnrolledCourses';
import './App.css';
import {
    RecoilRoot,
} from 'recoil';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                // overflowX: "hidden",
                fontFamily: "Quicksand",
            }}
        >
            <RecoilRoot>
                <Router>
                    <Appbar />
                    <div
                        style={{
                            flex: 1,
                            // backgroundColor: "#eeeeee",
                            overflowX: "hidden",

                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/add-course" element={<AddCourse />} />
                            <Route path="/courses" element={<ShowCourses />} />
                            <Route path="/courses/:courseId" element={<EditCourse />} />
                            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default App;