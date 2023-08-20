import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./userState";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { adminState } from "./adminAtom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const [isAdmin, setIsAdmin] = useRecoilState(adminState);
    let admin = isAdmin;

    async function signUp() {
        try {
            const adminHeaders = {
                'Content-Type': 'application/json',
                username: email,
                password
            };
            const url = (admin) ? 'http://localhost:3000/admin/signup' : 'http://localhost:3000/users/signup';
            let res = null;
            if (admin) {
                res = await axios.post(url, {}, { adminHeaders });
            } else {
                res = await axios.post(url, { username: email, password });
            }

            console.log('post req success');
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser({
                ...user,
                username: email
            });
            setIsAdmin(admin);
            navigate('/');


        } catch (err) {
            console.log('post req failed: ' + err);
            alert('Signup failed, retry!!');
        }

        setEmail("");
        setPassword("");
    }


    return <div>
        <div>


            <div className="w-screen text-center h-auto flex flex-col justify-baseline items-center mt-10">
                <p className="text-gray-500 text-4xl font-semibold my-7">Create a new account</p>

                <form onSubmit={signUp} className="shadow-lg w-100 bg-white flex flex-col pt-10 items-center h-auto p-4 w-1/4 gap-4 border border-gray-300 rounded-lg">
                    <input
                        type="email" required placeholder="Email" className=" border-2 bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        onChange={e => setEmail(e.target.value)} value={email}
                    />
                    <input
                        type="password" required placeholder="Password" className="bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        onChange={e => setPassword(e.target.value)} value={password}
                    />
                    <FormControlLabel
                        control={<Switch checked={admin} onChange={() => { admin = !admin }} />}
                        label="Admin Role"
                    />


                    <button
                        type="submit"
                        className="bg-[#212121] text-white hover:bg-neutral-700 font-bold py-2 px-4 rounded-lg mt-4"
                        onClick={signUp}
                    >Sign Up</button>
                </form>
            </div>
        </div>
    </div >
}

export default Register;