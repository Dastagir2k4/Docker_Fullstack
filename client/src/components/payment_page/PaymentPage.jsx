import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { totalAmount, HotelName } = useParams();
  const totalPerson = totalAmount / 50;
  const user = useSelector((state) => state.user.value);

  // State variables for form inputs and errors
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const errors = {};
    if (!cardholderName.trim()) {
      errors.cardholderName = "Cardholder's name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(cardholderName.trim())) {
      errors.cardholderName = "Cardholder's name must contain only letters";
    }
    if (!cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (cardNumber.trim().length >= 10) {
      errors.cardNumber = "Card number must be less than 10 digit";
    }
    if (!expiration.trim()) {
      errors.expiration = "Expiration date is required";
    }
    if (!cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (cvv.length !== 3) {
      errors.cvv = "CVV must have 3 digits";
    }

    // If there are validation errors, set them and return
    const UserName = user.FirstName;
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, proceed with form submission
    try {
      const Email = user.UserId;
      console.log(Email);
      await axios.post("https://reserve-eat-server-1.onrender.com/add-hotelOrder", {
        UserId: user.UserId,
        hotelname: HotelName,
        totalPerson: totalPerson,
        totalAmount: totalAmount,
      });

      console.log("successfully sent mail from client");
      toast.success("Table booked successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.log("error while sending mail from client", err);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate("/home");
        console.log("timeeeeeee");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [isSubmitted, navigate]);

  return (
    <div>
      <div className="font-[sans-serif] bg-white p-4 min-h-screen">
        <div className="lg:max-w-6xl max-w-xl mx-auto pt-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-lg:order-1">
              <h2 className="text-3xl font-extrabold text-[#333]">Make a payment</h2>
              <p className="text-[#333] text-base mt-6">
                Complete your transaction swiftly and securely with our easy-to-use payment process.
              </p>
              <form className="mt-12 max-w-lg" onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  {/* Cardholder's Name */}
                  <input
                    type="text"
                    placeholder="Cardholder's Name"
                    className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-sm">{errors.cardholderName}</p>
                  )}
                  {/* Card Number */}
                  <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                      <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232" />
                      <path
                        fill="#fed049"
                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                        className="hovered-path"
                        data-original="#fed049"
                      />
                    </svg>
                    <input
                      type="number"
                      placeholder="Card Number"
                      className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm outline-none"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                  {/* Expiration and CVV */}
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="number"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                    />
                    {errors.expiration && (
                      <p className="text-red-500 text-sm">{errors.expiration}</p>
                    )}
                    <input
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-purple-500 outline-none"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="bg-gray-100 p-6 rounded-md shadow-2xl">
              <h2 className="text-4xl font-extrabold text-[#333]">₹{totalAmount}</h2>
              <ul className="text-[#333] mt-10 space-y-6">
                <li className="flex flex-wrap gap-4 text-base">
                  Hotel Name <span className="ml-auto font-bold">{HotelName}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-base">
                  Per person <span className="ml-auto font-bold">₹50.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-base">
                  No of Person <span className="ml-auto font-bold">{totalPerson}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">
                  Total <span className="ml-auto">{totalAmount}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PaymentPage;
