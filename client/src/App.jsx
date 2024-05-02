import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Home from "./components/home/Home"
import ListCards from "./components/AllCards/ListCards"
import RestuarantDetail from "./components/restaurant_details/RestuarantDetail"
import PaymentPage from "./components/payment_page/PaymentPage"



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/restaurants" element={<ListCards/>}/>
        <Route path="/restaurant_detail/:id" element={<RestuarantDetail/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App