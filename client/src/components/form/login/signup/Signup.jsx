import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signupImage from "./food.webp";

const Signup = () => {
  const navigate = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(FirstName, LastName);
    axios
      .post("http://localhost:3030/signup", {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password,
      })
      .then(() => {
        console.log("success");
        navigate("/");
      })
      .catch((err) => {
        console.log("error " + err);
      });
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto">
        <div className="flex w-8/12 overflow-hidden rounded-xl mx-auto shadow-lg">
          <div className="md:w-1/2">
            <img src={signupImage} alt="Signup" />
          </div>

<div className="md:w-1/2 py-16 px-12 mt-20">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">Create an Account</p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-gray-400 py-1 px-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-400 py-1 px-2"
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full"
                />
              </div>
              {Error && <p className="text-red-500 mt-3">{Error}</p>}
              <div className="mt-5">
                <button
                  type="button"
                  className="w-full bg-purple-500 text-white py-2 text-center"
                  onClick={handleSignup}
                >
                  Register
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
