

// import { useNavigate } from "react-router-dom";
// import login from "./login.jpg";

// const Login = () => {
//     const nav=useNavigate()
//     const navtosignup=()=>{
//         nav('/signup')
//     }
   
//     const handleLogin = async () => {
//         try {
//           const response = await axios.post('/login', { Email, Password });
    
//           if (response.status === 200) {
//             // If login is successful, navigate to the home page
//             history.push('/home');
//           } else {
//             setError(response.data);
//           }
//         } catch (error) {
//           console.error('Error during login:', error);
//           setError('Error during login');
//         }
//       };
//   return (
//     <div className="min-h-screen py-40">
//         <div className="container mx-auto">
//             <div className=" flex-col md:flex-row flex w-8/12 overflow-hidden rounded-xl mx-auto shadow-lg">
//                 <div className="w-1/2">
//                     <img src={login} alt="0"/>
//                 </div>
//                 <div className="w-1/2 py-16 px-12 mt-20">
//                     <h2 className="text-3xl mb-4">Login</h2>
//                     <form>
//                         {/* <div className="gird grid-cols-2 gap-5">
//                             <input type="text" placeholder=" Firstname" className="border border-gray-400 py-1 px-2 mr-2"/>
//                             <input type="text" placeholder=" Surname " className="border border-gray-400 py-1 px-2"/>
//                         </div> */}
//                         <div className="mt-5">
//                         <input type="email" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full"/>
//                         </div>
//                         <div className="mt-5">
//                         <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2  md:w-full"/>
//                         </div>
//                         <div className="mt-5">
//                             <button className="w-full bg-purple-500 text-white py-2 text-center" onClick={handleLogin}>Register</button>
//                         </div>
//                         <div className="mt-5">
//                             <p>New User ? Create an Account </p>
//                             <button className="w-full bg-purple-500 text-white py-2 text-center mt-3" onClick={navtosignup}>Signup</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from './login.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navToSignup = () => {
    navigate('/signup');
  };

  const LoginToDb = (e) => {
    e.preventDefault();
    console.log(Email+Password);
    // Use the navigate function to go to the "/createaccount" route
    axios.post('http://localhost:3030/login',{
        Email:Email,
        Password:Password,
    }).then((result)=>{
        console.log(" success ",result);
        const role=result.data.role;
        if(role==='admin'){
            navigate('/home');
        }else{
            alert("ïnvalid");
        }
    }).catch((err)=>{
        console.log("error",err);
    })

  };

  return (
    <div className="min-h-screen py-40">
      <div className="container mx-auto">
        <div className=" flex-col md:flex-row flex w-8/12 overflow-hidden rounded-xl mx-auto shadow-lg">
          <div className="w-1/2">
            <img src={login} alt="0" />
          </div>
          <div className="w-1/2 py-16 px-12 mt-20">
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
                  className="border border-gray-400 py-1 px-2  md:w-full"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <button className="w-full bg-purple-500 text-white py-2 text-center" onClick={LoginToDb}>
                  Login
                </button>
              </div>
              <div className="mt-5">
                <p>New User ? Create an Account </p>
                <button className="w-full bg-purple-500 text-white py-2 text-center mt-3" onClick={navToSignup}>
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
