import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import ReactPaginate from "react-paginate";

const ListCards = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [pageNumber, setPageNumber] = useState(0); // State for pagination

  const restaurantsPerPage = 5; // Number of restaurants to display per page
  const pagesVisited = pageNumber * restaurantsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reserve-eat-server-1.onrender.com/hotels");
        setData(response.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  const navToDetails = (restaurantId) => {
    navigate(`/restaurant_detail/${restaurantId}`);
  };

  const pageCount = Math.ceil(data.length / restaurantsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-500">
        <input
          className="w-1/2 mb-4 mt-4 h-8 px-2 py-3 rounded-lg text-black text-2xl bg-white border-black"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-center gap-6 mb-8 mt-8">
          <button
            className={`btn ${filter === "all" ? "bg-gray-400" : "bg-gray-200"} text-black w-20 p-2 text-center rounded-lg`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "veg" ? "bg-green-400" : "bg-green-200"} text-black w-20 p-2 text-center rounded-lg`}
            onClick={() => setFilter("veg")}
          >
            Veg
          </button>
          <button
            className={`btn ${filter === "non-veg" ? "bg-red-500" : "bg-red-300"} text-black w-20 p-2 text-center rounded-lg`}
            onClick={() => setFilter("non-veg")}
          >
            Non-Veg
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {data
            .filter((item) => {
              const searchTerm = search.toLowerCase();
              const nameMatches = item.Name.toLowerCase().includes(searchTerm);
              const categoryMatches =
                filter === "all" || item.category.toLowerCase() === filter;
              return nameMatches && categoryMatches;
            })
            .slice(pagesVisited, pagesVisited + restaurantsPerPage) // Add pagination slice
            .map((restaurant) => (
              <div
                key={restaurant.HotelId}
                className="w-70 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => navToDetails(restaurant.HotelId)}
              >
                <img
                  src={restaurant.ImageUrl}
                  alt="Restaurant"
                  className="h-50 w-80 rounded-xl object-cover"
                />
                <div className="p-2">
                  <div className="flex flex-row justify-between">
                    <h2 className="font-bold text-lg mb-2">{restaurant.Name}</h2>
                    <p className="bg-green-600 h-6 w-8 text-center rounded-lg text-white">
                      {restaurant.Rating}
                    </p>
                  </div>
                  <span className="text-xl font-semibold text-slate-600 mb-2">
                    {restaurant.Location}
                  </span>
                  <div className="flex flex-row justify-between">
                    <p className="text-red-500 text-lg">{restaurant.category}</p>
                    <button className="btn bg-slate-600 text-white p-1">
                      Know more
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ReactPaginate
  previousLabel={"Previous"}
  nextLabel={"Next"}
  pageCount={pageCount}
  onPageChange={changePage}
  containerClassName={"flex justify-center mt-8 space-x-4"}
  pageClassName={"border bg-slate-300 text-black border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"}
  previousClassName={"border bg-white border-gray-300 rounded-md px-3 py-1"}
  nextClassName={"border bg-white border-gray-300 rounded-md px-3 py-1"}
  activeClassName={"bg-blue-800 text-white rounded-md px-3 py-1 "}  // Adding !important
/>

      </div>
    </div>
  );
};

export default ListCards;
