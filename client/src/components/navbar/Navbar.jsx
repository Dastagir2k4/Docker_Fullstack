

// const Navbar = () => {
//   return (
//     <div className="bg-slate-800  text-white sticky top-0 z-[20] mx-auto flex  w-full items-center justify-between p-4">
//         <h2 className="text-3xl">Logo</h2>
//        <div className="flex gap-20">
       
//         <ul className="flex gap-20 text-2xl">
//             <li>Home</li>
//             <li>About</li>
//             <li>Servies</li>
//             <li>Booking</li>
//             <li>Booking</li>
//             {/* <li><button className="btn border-t-neutral-200 bg-slate-500 text-white px-2">Login</button></li> */}
//         </ul>
//        </div>
//     </div>
//   )
// }

// export default Navbar


import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-slate-800 text-white sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-4">
            <h2 className="text-3xl">Logo</h2>
            <button onClick={toggleMenu} className="md:hidden text-2xl">
                {isOpen ? 'Close' : 'Menu'}
            </button>
            <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} md:gap-20`}>
                <ul className="flex gap-10 text-2xl">
                    <li>Home</li>
                    <li>Restaurants</li>
                    <li>Book Table</li>
                    <li>Contact</li>
                </ul>
                {/* Add login button if needed */}
                {/* <button className="btn border-t-neutral-200 bg-slate-500 text-white px-2">Login</button> */}
            </div>
        </div>
    );
};

export default Navbar;
