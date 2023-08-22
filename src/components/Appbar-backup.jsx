
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./userState";
import { useNavigate } from "react-router-dom";

export default function App() {

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);



  useEffect(() => {
    try {
      const url = "http://localhost:3000/admin/me";

      fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUser({
              ...user,
              username: data.username,
            });
            console.log('appbar username updated');
          }
          setUser({
            ...user,
            loading: false,
          });
        })
        .catch((err) => {
          console.log("/me api fetch request fail: " + err);
          setUser({
            ...user,
            loading: false,
          });
        });
      console.log('appbar: ' + user.username);
    } catch (err) {
      console.log("/me api fetch request fail: " + err);
      setUser({
        ...user,
        loading: false,
      });
    }
  }, []);

  const LogIn = () => (
    <div className="flex gap-2">
      <div>{user.username}</div>
      <Button
        variant="contained"
        onClick={() => {
          localStorage.setItem("token", null);
          // window.location = "/";
          setUser({
            ...user,
            username: null,
          })
          navigate('/');
        }}
      >
        Logout
      </Button>
    </div>
  );

  const LogOut = () => (
    <div className="flex gap-2">
      <Link
        to="/login"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
      >
        Signup
      </Link>
    </div>
  );

  const imageClickHandler = () => {
    // navigate('/');
  }

  return (
    <div>
      <nav className="h-auto w-screen flex justify-between p-8">
        <img
          src="/images/logo.png"
          alt="course-vista"
          className="h-10 rounded-lg cursor-pointer"
          onClick={imageClickHandler}
        />

        {user.loading ? (
          <p>Loading...</p> // Display loading state
        ) : user.username ? (
          <LogIn />
        ) : (
          <LogOut />
        )}
      </nav>
    </div>
  );
}

