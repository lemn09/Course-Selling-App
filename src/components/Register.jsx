import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./userState";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    async function signUp() {
        try {
            const headers = {
                'Content-Type': 'application/json',
                username: email,
                password
            };
            const url = 'http://localhost:3000/admin/signup';
            const res = await axios.post(url, {}, { headers });

            console.log('post req success');
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            // window.location = '/';
            setUser({
                ...user,
                username: email
            });
            navigate('/');

        } catch (err) {
            console.log('post req failed: ' + err);
        }
    }

    return <div>
        <div>

            {/* <nav className=" h-auto w-screen flex justify-between p-8">
                <img src="/images/logo.png" alt="course-vista" className=" h-12 rounded-lg" />
                <Link to="/login" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow">Sign In</Link>
            </nav> */}

            <div className="w-screen text-center h-auto flex flex-col justify-baseline items-center mt-10">
                <p className="text-gray-500 text-4xl font-semibold my-7">Create a new account</p>
                {/* <p className="text-gray-400 text-3xl font-semibold my-7 leading-10">Lets get you signed in</p> */}

                <form onSubmit={signUp} className="shadow-lg w-100 bg-white flex flex-col pt-10 items-center h-60 w-1/4 gap-4 border-slate-50">
                    <input
                        type="email" required placeholder="Email" className=" border-2 bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password" required placeholder="Password" className="bg-[#f7f7f9] p-2 rounded-sm shadow-md w-2/3 hover:bg-white focus:bg-white"
                        onChange={e => setPassword(e.target.value)}
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