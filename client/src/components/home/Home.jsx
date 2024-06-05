import React from "react";
import Navbar from "../navbar/Navbar";
import Restaurants from "../Restaurants/Restaurants";
import Card from "../Card/CardSection";
import hero from "./reserve2.jpg";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigaite=useNavigate()
  const navtohotels=()=>{
    navigaite("/restaurants")
  }
  return (
    <div className="">
      {/* Navbar section */}
      <Navbar />
      {/* Hero Section*/}
      <div
        id="hero"
        className="flex flex-col min-h-screen md:flex-row bg-white text-black justify-center items-center"
      >
        <div className="md:w-1/2 flex flex-col  mb-48">
          <h1 className="text-4xl md:text-6xl font-serif text-black mb-10">
            Book Your Table Now
          </h1>
          <p className="text-lg md:text-2xl font-serif text-black opacity-90 mt-6 leading-relaxed">
            
            Experience the finest dining with our wide selection of restaurants.{" "}
          
            <br />
            Reserve your table hassle-free and enjoy exquisite cuisines today!
            <br />
            Blast your dinner with Reserve Eat
            <br/>
            Don't wait in line or worry about availability. With Reserve Eat, you can secure your spot in advance and make your dining experience unforgettable
          </p>
          <div className="mt-12 px-2 bg-rose-600 text-white rounded-md w-28">
            <button onClick={navtohotels}>Check Out Restaurant</button>
          </div>
        </div>
        <img
          className="md:w-1/2"
          src={hero}
          style={{ background: "cover", height: 550, width: 450 }}
          alt="Programmer"
        />
      </div>
      {/* Food category Section*/}
      <Card />
      <Footer />
    </div>
  );
};

export default Home;
