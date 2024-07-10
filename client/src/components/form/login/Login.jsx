import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login from "./login.jpg";
import { useDispatch } from "react-redux";
import { loginn } from "../../../redux/User";
//useDispatch hook is for modifying the state
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navToSignup = () => {
    navigate("/signup");
  };

  const LoginToDb = (e) => {
    e.preventDefault();
    console.log(Email + Password);
    // Use the navigate function to go to the "/createaccount" route
    axios
      .post("https://reserve-eat-server-1.onrender.com/login", {
        Email: Email,
        Password: Password,
      })
      .then((result) => {
        console.log(" success ", result.data);
        const role = result.data.role;
        // console.log("Username ",result.data.user.FirstName);
        const Fname = result.data.user.FirstName;
        const Sname = result.data.user.LastName;
        const UserId=result.data.user.UserId;
        console.log(Fname, Sname);
        if (role === "admin") {
          console.log("email" + Email);
          dispatch(
            loginn({UserId:UserId, FirstName: Fname, SecondName: Sname, Email: Email  })
          );
          // dispatch(loginn(Email));
          navigate("/home");
        } else {
          alert("ïnvalid");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="min-h-screen ">
      <h2 className="text-4xl text-center py-10 font-mono">
        Restaurant Table Booking
      </h2>
      <div className="container mx-auto">
        <div className=" flex-col md:flex-row flex w-8/12 overflow-hidden rounded-xl mx-auto shadow-lg">
          <div className="md:w-1/2">
            <img src={login} alt="0" />
          </div>
          <div className="md:w-1/2 py-16 px-12 mt-20">
            <h2 className="text-3xl mb-4">Login</h2>
            <form>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2  w-full"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <button
                  className="w-full bg-purple-500 text-white py-2 text-center"
                  onClick={LoginToDb}
                >
                  Login
                </button>
              </div>
              <div className="mt-5">
                <p>New User ? Create an Account </p>
                <button
                  className="w-full bg-purple-500 text-white py-2 text-center mt-3"
                  onClick={navToSignup}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
