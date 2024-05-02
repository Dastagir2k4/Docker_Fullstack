// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/form/login/Login";
import Signup from "./components/form/login/signup/Signup";
import Home from "./components/home/Home";
import ListCards from "./components/ListofRestaurants/Restaurants";
import RestuarantDetail from "./components/restaurant_details/RestuarantDetail";
import PaymentPage from "./components/payment_page/PaymentPage";
import Profile from "./components/profile/Profile";
import SampleLogin from "./components/SampleLogin"; // Import without curly braces

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    {/* <Route path="/lo" element={<SampleLogin />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/restaurants" element={<ListCards />} />
                    <Route path="/restaurant_detail/:id" element={<RestuarantDetail />} />
                    <Route path="/payment/:totalAmount/:HotelName" element={<PaymentPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
