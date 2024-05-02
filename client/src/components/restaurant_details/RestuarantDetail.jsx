

import { Fragment, useState, useEffect } from "react";
import Modals from "../Modals/Modals";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestuarantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/hotels/${id}`);
        setData(response.data);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(guests>data[0].Accomodation){
      alert("Room limit is exceded")
    }else{

      showModal(false)
    }
    console.log("time "+time);
  }
  const navToPay = () => {
    navigate(`/payment/${guests * 50}/${data[0].Name}`);
  };

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching restaurant data</div>
      ) : (
        <div className="min-h-screen py-40 ">
          <div className="container mx-auto">
            <div className="flex-col md:flex-row flex w-8/12 overflow-hidden rounded-xl mx-auto shadow-lg h-[600px]">
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold">Name :<span className="text-lg font-semibold"> {data.length > 0 ? data[0].Name : "No data found"} </span></h2>
                <h2 className="text-2xl font-semibold">Location :<span className="text-lg font-medium"> {data[0].Location}</span> </h2>
                <h2 className="text-2xl font-semibold">Number of Accomdation: <span> {data[0].Accomodation} </span></h2>
                <img src={data.length > 0 ? data[0].ImageUrl : ""} alt="Restaurant" className="rounded-2xl h-[610px]" />
              </div>
              <div className="w-1/2 py-16 px-12 mt-20 ">
                <button className="text-3xl mb-4 top-20 cursor-pointer  px-4 w-56 h-10 text-white bg-red-500" onClick={() => setShowModal(true)}>Select Slots   </button>
                <div className="bg-gray-200 text-black px-6 py-6">
                  <h2 className="text-2xl mb-2">Your date : <span className="text-lg font-semibold">{date}</span></h2>
                  <p className="mb-2 text-xl">Selected guests  :<span className="text-lg font-semibold"> {guests} </span> </p>
                  <h2 className="mb-2 text-xl ">Book Table per person : <span className="text-lg font-semibold">50R</span></h2>
                  <p className="mb-2 text-xl">Total Amount :{guests * 50} R <span></span></p>
                  <button className="bg-indigo-600 w-full text-white mt-20 p-2 text-xl" onClick={navToPay}>Pay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modals isVisible={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-semibold mb-4" >Select Slot & Guests</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
            <input type="date" id="date" className="p-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="time" className="block font-medium text-gray-700">Time Slot</label>
            <input type="time" id="time" className=" p-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setTime(e.target.value)} />
          </div>
          <div>
            <label htmlFor="guests" className="block font-medium text-gray-700">Guest Number</label>
            <input type="number" id="guests" className="p-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setGuests(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </Modals>
    </Fragment>
  );
};

export default RestuarantDetail;
