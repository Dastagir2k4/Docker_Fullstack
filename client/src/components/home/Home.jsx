import React from "react";

import Navbar from "../navbar/Navbar";
import Restaurants from "../Restaurants/Restaurants";
import Card from "../Card/CardSection";
import hero from "./reserve2.jpg";
const Home = () => {
  return (
    <div>
      {/* Navbar section */}
      <Navbar />
      {/* Hero Section*/}
      <div
        id="hero"
        className="flex flex-col min-h-screen md:flex-row bg-white text-black justify-center items-center"
      >
        <div className="md:w-1/2 flex flex-col justify-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            Book Your Table Now
          </h1>
          <p className="text-lg md:text-xl text-black opacity-90 mt-6">
            Experience the finest dining with our wide selection of restaurants.{" "}
            <br />
            Reserve your table hassle-free and enjoy exquisite cuisines today!
          </p>
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
    </div>
  );
};

export default Home;
