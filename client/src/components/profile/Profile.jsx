import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.value);
    const [orders,setOrders]=useState([])
    const handleData= async()=>{
        try {
            const response = await axios.get(`https://reserve-eat-server-1.onrender.com/UserOrders?userId=${user.UserId}`);
            setOrders(response.data);
            console.log("successfully clicked the data of histiry");
            console.log(orders);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        }
    }
    return (
        <div className="container mx-auto p-6 bg-slate-300 ">
            <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    
                    <label className="block text-gray-700 text-xl font-bold mb-2">Name:</label>
                    <p className="text-gray-700 text-lg">{user.FirstName} {user.SecondName}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2">Email:</label>
                    <p className="text-gray-700 text-lg">{user.Email}</p>
                </div>
            </div>
            <button onClick={handleData} className='bg-red-600 text-white px-2 py-2 rounded-md'>Booking History</button>
            <div className="flex flex-wrap justify-center">
                {orders.map((order) => (
                    <div key={order.id} className="max-w-md rounded-2xl overflow-hidden shadow-lg mx-4 my-4 bg-yellow-200" >
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Order ID: {order.id}</div>
                            <p className="text-gray-700 text-lg">Hotel Name: {order.hotelname}</p>
                            <p className="text-gray-700 text-lg">Total Person: {order.totalperson}</p>
                            <p className="text-gray-700 text-lg">Amount: ${order.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Profile = () => {
//     const user = useSelector((state) => state.user.value);
//     const [orders, setOrders] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3030/UserOrders?userId=${user.id}`);
//             setOrders(response.data);
//         } catch (error) {
//             console.error("Error fetching user orders:", error);
//         }
//     };

//     if (user.id) {
//         fetchOrders();
//     }

//     return (
//         <div className="container mx-auto p-6 bg-slate-300 ">
//             <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
//             <h2>{user.Firstname}</h2>
//             <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
//                 {orders.length > 0 ? (
//                     orders.map((order) => (
//                         <div key={order.id} className="mb-4">
//                             <h2 className="text-xl font-bold mb-2">Order ID: {order.UserId}</h2>
//                             <p className="text-gray-700 text-lg">Hotel Name: {order.hotelname}</p>
//                             <p className="text-gray-700 text-lg">Total Person: {order.totalperson}</p>
//                             <p className="text-gray-700 text-lg">Amount: ${order.amount}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-700 text-lg">No orders found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;
