// App.jsx
import React, { lazy ,Suspense} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Signup=lazy(()=>import("./components/form/login/signup/Signup"));
const Home=lazy(()=>import("./components/home/Home"));
const ListCards=lazy(()=>import( "./components/ListofRestaurants/Restaurants"));
const RestuarantDetail=lazy(()=>import("./components/form/login/Login"));
const PaymentPage=lazy(()=>import("./components/payment_page/PaymentPage"));
const Profile=lazy(()=>import("./components/profile/Profile"));
const Login=lazy(()=>import("./components/form/login/Login"))

const App = () => {
    return (
        <div>
            <BrowserRouter>
                    <Suspense fallback={<div className='bg-black text-white'>Loading...</div>}>
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
                    </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
