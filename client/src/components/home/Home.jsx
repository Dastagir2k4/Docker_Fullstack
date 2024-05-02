

import React from 'react'

import Navbar from '../navbar/Navbar';
import Restaurants from '../Restaurants/Restaurants';
import Card from '../Card/Card';
import hero from "./reserve2.jpg"
const Home = () => {
    return (
       
      <div>
        <Navbar/>
        <div  className="flex flex-col min-h-screen md:flex-row bg-white text-black justify-center items-center">
        {/* <div className="md:w-1/2 flex flex-col text-white mb-5">
         <h2 className='text-red-400 text-6xl '>Adiya Dinner Booking</h2> 
        </div> */}
        <div className="md:w-1/2 flex flex-col justify-center ">
    <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">Book Your Table Now</h1>
    <p className="text-lg md:text-xl text-black opacity-90 mt-6">Experience the finest dining with our wide selection of restaurants. <br/>Reserve your table hassle-free and enjoy exquisite cuisines today!</p>
</div>
        <img className="md:w-1/2" src={hero} style={{background:"cover" , height:550 , width:450}}alt="Programmer" />
      </div>
      <Card/>
      </div>
    );
}

export default Home

// import axios from "axios";
// import { useState, useEffect } from "react";

// const Home = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3030/hotels");
//         setData(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Hotels</h1>
//       <div>
//         {data.map((hotel) => (
//           <div key={hotel.id}> {/* Assign a unique key using hotel id */}
//             <h2>{hotel.Name}</h2>
//             <img src={hotel.ImageUrl} alt={hotel.name} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
