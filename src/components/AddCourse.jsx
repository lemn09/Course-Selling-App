import React from "react";
import { Switch, TextField, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminState } from "./adminAtom";
import BaseURL from "./BaseURL";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.

const context = React.createContext();

function AddCourse() {

    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [imgLink, setImgLink] = React.useState("https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png");
    const [price, setPrice] = React.useState(0);

    const [isAdmin] = useRecoilState(adminState);

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
    }, [])

    return <div>

        <context.Provider value={{ title, setTitle, desc, setDesc, imgLink, setImgLink, price, setPrice }}>
            <CourseForm />
        </context.Provider>

    </div>
}

function CourseForm() {
    const { title, setTitle, desc, setDesc, imgLink, setImgLink, price, setPrice } = React.useContext(context);
    const [errors, setErrors] = React.useState({
        title: false,
        desc: false,
    });
    const [published, setPublished] = React.useState(false);

    async function createCourse(e) {
        e.preventDefault();

        const wordCount = desc.split(/\s+/).filter(Boolean).length;
        const newErrors = {
            title: !title,
            desc: !desc,
        };

        if (newErrors.title || newErrors.desc || wordCount > 50) {
            setErrors(newErrors);
            return;
        }

        // Your submit logic here
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const url = BaseURL + "/admin/courses";
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        description: desc,
                        imageLink: imgLink,
                        price,
                        published
                    }),
                    headers
                }

                // console.log(`${title} ${desc} ${imgLink} ${price} ${published}`);
                const response = await fetch(url, options);
                const data = await response.json();

                alert('course added successfully, courseId: ' + data.courseId);
            } else {
                alert('please login first');
            }
            setTitle('');
            setDesc('');
            setImgLink('');
            setPrice('');
            setPublished(false);
            setErrors({ title: false, desc: false });
        } catch (err) {
            console.log('course not added, fetch request failed ' + err);
        }

        setTitle('');
        setDesc('');
        setImgLink('');
        setPrice('');
        setPublished(false);
        setErrors({ title: false, desc: false });
    }

    function handleSwitchChange() {
        setPublished(!published);
    }

    return (
        <div >

            <div className="w-screen text-center h-auto flex flex-col justify-baseline items-center mt-10">
                <p className="text-gray-500 text-3xl font-semibold mb-8">Create Course</p>


                <form onSubmit={createCourse} className="shadow-lg w-100 bg-white flex flex-col pt-10 items-center w-1/4 gap-2 border-slate-50 py-5">
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        placeholder="Title"
                        required
                        size="small"
                        error={errors.title}
                        helperText={errors.title && 'Title is required'}
                        value={title}
                    />
                    <TextField onChange={(e) => { setDesc(e.target.value) }} id="outlined-basic" label="Description" variant="outlined" placeholder="Description" size="small" error={errors.desc} helperText={errors.desc && 'Description is required and should be less than 50 words'} value={desc} />
                    <TextField onChange={(e) => { setImgLink(e.target.value) }} id="outlined-basic" label="Image" variant="outlined" placeholder="Image Link" size="small" value={imgLink} />
                    <TextField onChange={(e) => { setPrice(e.target.value) }} id="outlined-basic" label="Price" variant="outlined" placeholder="Price" size="small" value={price} />
                    <FormControlLabel
                        label="Published"
                        control={<Switch checked={published} onChange={handleSwitchChange} />}
                    />

                    <button
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        type="submit"
                    >ADD COURSE</button>
                </form>

            </div>
        </div >
    )
}


export default AddCourse;