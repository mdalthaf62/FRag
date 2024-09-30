import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faDashboard,faBoxes,faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onToggle }) => {
  const [expd, setExpd] = useState(true);

  const toggleexpd = () => {
    setExpd(!expd);
    
  };

  return (
    <div>
      <div
        className={`${
          expd ? 'w-52' : 'w-20'
        } bg-gray-950 h-screen border-gray-800 border-t-2 border-r-2 fixed mt-[89px] transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={toggleexpd}
          className={`flex justify-end absolute items-center mt-3 transition-all duration-300 ease-in-out ${
            expd ? '' : 'rotate-180 left-7 text-2xl'
          }`}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="text-white text-2xl" />
        </button>

        <ul className={`mt-12 flex flex-col space-y-2 text-center ${expd ? 'block' : 'hidden'}`}>
          <Link to="/">
            <li className="poppins-regular text-md text-white hover:bg-yellow-500 hover:text-gray-950 p-3 list-none">Dashboard</li>
          </Link>
          <Link to="/products">
            <li className="poppins-regular text-md text-white hover:bg-yellow-500 hover:text-gray-950 p-3">Products</li>
          </Link>
          <Link to="/sale">
            <li className="poppins-regular text-md text-white hover:bg-yellow-500 hover:text-gray-950 p-3">Sale</li>
          </Link>
        </ul>

        <ul className={`mt-12 flex flex-col space-y-2 text-center ${!expd ? 'block' : 'hidden'}`}>
          <Link to="/">
            <li className="poppins-regular text-md text-white hover:bg-gray-900 p-3 text-2xl right-2">
              <FontAwesomeIcon icon={faDashboard} />
            </li>
          </Link>
          <Link to="/products">
            <li className="poppins-regular text-md text-white hover:bg-gray-900 p-3 text-2xl">
              <FontAwesomeIcon icon={faBoxes} />
            </li>
          </Link>
          <Link to="/sale">
            <li className="poppins-regular text-md text-white hover:bg-gray-900 p-3 text-2xl">
              <FontAwesomeIcon icon={faMoneyBill} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
