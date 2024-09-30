import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import assets from './assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Product = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // State for sidebar width

  useEffect(() => {
    const product = assets.filter(item => item.id == params.id);
    setProductDetails(product[0]);
  }, [params.id]);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar onToggle={setSidebarExpanded} /> {/* Pass state handler to Sidebar */}

        <div
          className={`px-5 md:px-20 flex flex-col gap-5 w-full md:flex-row justify-around items-center mt-20 transition-all duration-300 ${
            sidebarExpanded ? 'ml-52' : 'ml-20'
          }`} // Adjust width based on sidebar state
        >
          <div className="flex justify-center">
            <img
              src={productDetails.imageUrl}
              alt={productDetails.name}
              className="w-40 h-40 sm:h-96 sm:w-96 object-contain"
            />
          </div>

          <div className="flex flex-col gap-2 px-5 py-10 bg-pink-100 rounded-2xl justify-between">
            <div>
              <p className="font-bold text-xl sm:text-2xl">{productDetails.name}</p>
              <p className="font-semibold text-base sm:text-lg">{productDetails.description}</p>
              <div className="flex flex-col gap-2">
                <p className="underline italic">Fragrance Notes</p>
                <div className="flex gap-5">
                  {productDetails.fragranceNotes &&
                    productDetails.fragranceNotes.map((item, index) => (
                      <p
                        key={index}
                        className="bg-gray-500 text-white rounded-lg px-3 py-1 h-fit w-fit text-xs sm:text-sm"
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>
              <p>
                Rating: {productDetails.rating}
                <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              </p>
              <p>Quantity - {productDetails.size}</p>
            </div>

            <div>
              <p className="bg-green-600 px-5 py-2 text-sm text-white font-semibold rounded-lg w-fit">
                Price {productDetails.price} AED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
