import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./userState";
import { adminState } from "./adminAtom";
import { FormControlLabel, Switch } from "@mui/material";

// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [user, setUser] = useRecoilState(userState);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isAdmin, setIsAdmin] = useRecoilState(adminState);
    const [admin, setAdmin] = React.useState(isAdmin);

    const navigate = useNavigate();

    async function logIn(e) {
        e.preventDefault();

        // request to fetch token using axios
        try {
            const headers = {
                'Content-Type': 'application/json',
                username: email,
                password
            };
            const url = (admin) ? 'http://localhost:3000/admin/login' : 'http://localhost:3000/users/login';
            const res = await axios.post(url, {}, { headers });

            console.log('post req success');
            localStorage.setItem('token', res.data.token);

            setUser({
                ...user,
                username: email
            });

            setIsAdmin(admin);
            navigate('/');

        } catch (err) {
            console.log('post req failed');
            alert('Login failed, retry!!');
        }

        setEmail("");
        setPassword("");
    }

    return <div>

        <div >

            <div className="w-screen text-center h-auto flex flex-col justify-baseline items-center mt-10">
                <p className="text-gray-500 text-4xl font-semibold">Welcome back!</p>
                <p className="text-gray-400 text-3xl font-semibold my-7 leading-10">Lets get you signed in</p>


                <form onSubmit={logIn} className="shadow-lg w-100 bg-white flex flex-col pt-10 items-center h-auto p-4 w-1/4 gap-4 border border-gray-300 rounded-lg">
                    <input
                        type="text" placeholder="Email" className=" border-2 bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        value={email} onChange={e => setEmail(e.target.value)} required
                    />
                    <input
                        type="password" placeholder="Password" className="bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        value={password} onChange={e => setPassword(e.target.value)} required
                    />
                    <FormControlLabel
                        control={<Switch checked={admin} onChange={() => setAdmin(!admin)} />}
                        label="Admin Role"
                    />


                    <button
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        onClick={logIn}
                    >Sign In</button>
                    {/* <button onClick = {() => {
                        console.log('')
                    }}></button> */}
                </form>
            </div>
        </div>
    </div>
}

export default Login;