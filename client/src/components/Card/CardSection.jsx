import food from "./hotel.jpg";
import food1 from "./food.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Card = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://reserve-eat-server-1.onrender.com/hotels");
        setRestaurants(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);
  const navigaite = useNavigate();
  const navToRestaurants = () => {
    navigaite("/restaurants");
  };
  const navToDetails = (id) => {
    navigaite(`/restaurant_detail/${id}`);
  };
  return (
    <div className=" min-h-screen">
      <div>
        <h1 className="text-4xl text-red-500 flex px-24 pt-16 font-lead">choose category</h1>
        <div className="flex flex-col sm:flex-row ml-3 gap-10 py-8 px-24">
          <div
            className="flex flex-row bg-slate-200 h-32 w-56 rounded-2xl text-center shadow-2xl cursor-pointer "
            onClick={navToRestaurants}
          >
            <img src={food1} className="h-32 w-32 rounded-2xl" />
            <p className="text-2xl px-8 py-5">Breakfast</p>
          </div>
          <div
            className="flex flex-row bg-slate-200 h-32 w-56 rounded-2xl text-center shadow-2xl cursor-pointer"
            onClick={navToRestaurants}
          >
            <img src={food1} className="h-32 w-32 rounded-2xl" />
            <p className="text-2xl px-8 py-5">Lunch</p>
          </div>
          <div
            className="flex flex-row bg-slate-200 h-32 w-56 rounded-2xl text-center shadow-2xl cursor-pointer"
            onClick={navToRestaurants}
          >
            <img src={food1} className="h-32 w-32 rounded-2xl" />
            <p className="text-2xl px-8 py-5">Dinner</p>
          </div>
          <div
            className="flex flex-row bg-slate-200 h-32 w-56 rounded-2xl text-center shadow-2xl cursor-pointer"
            onClick={navToRestaurants}
          >
            <img src={food1} className="h-32 w-32 rounded-2xl" />
            <p className="text-2xl px-8 py-5">Fast Food</p>
          </div>
        </div>
      </div>

      <div className="text-4xl py-20 px-16 ml-20 font-lead text-red-500">
        <h2>Restaurants Near You</h2>
      </div>
      <div className=" gap-6 flex-wrap flex justify-center items-center mx-auto mb-20">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="w-70 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => navToDetails(restaurant.HotelId)}
            >
              <img
                src={restaurant.ImageUrl}
                alt={restaurant.Name}
                className="h-60 w-80 rounded-xl object-cover"
              />
              <div className="p-2">
                <div className="flex justify-between">
                  <h2 className="font-bold text-lg mb-2">{restaurant.Name}</h2>
                  <p className="bg-green-600 h-6 w-8 text-center rounded-lg text-white">
                    {restaurant.Rating}
                  </p>
                </div>
                <span className="text-xl font-semibold text-slate-600 mb-2">
                  {restaurant.Location}
                </span>
                <div className="flex justify-between">
                  <p className="text-red-500 text-lg">20% off</p>
                  <button className="btn bg-slate-600 text-white p-1">
                    Know more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
