import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-slate-800 text-white sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-4">
      <h2 className="text-3xl font-mono">ReservEat</h2>
      <button onClick={toggleMenu} className="md:hidden text-2xl">
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className={`md:flex ${isOpen ? "flex" : "hidden"} md:gap-20`}>
        <ul className="flex gap-10 text-2xl">
          <Link to="/home">Home</Link>
          <Link to="/restaurants">Restaurant</Link>
          <Link to="/profile">Profile</Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
