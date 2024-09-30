import React, { useState, Fragment } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import assets from '../Components/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretDown, faArrowUp, faArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useNavigate } from 'react-router-dom';
import products from '../Components/assets';

const Products = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false); // State for price dropdown
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [SizeDown, setSizeDown] = useState([]);
const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);// State for selected price range
    const [tableData, setTableData] = useState(assets);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedBrand, setSelectedBrand] = useState('');
    const navigate = useNavigate();
    const[brandDown,setBrandDown]=useState([]);
    
    const categories = ['Men', 'Women', 'Unisex', 'All'];
    const priceRanges = ['Below $50', '$50 - $100', '$100 - $200', 'Above $200', 'All'];
    const brandNames = [...new Set(assets.map((products) => products.brand))];
    const Sizes = [...new Set(assets.map((products) => products.size))];

    const handleBrandChange = (item) => {
        let updateBrand = [...selectedBrand];
        if( updateBrand.includes(item)){
            updateBrand = updateBrand.filter((brand) => brand !== item);
        }
        else{
            updateBrand.push(item);
        }
        setSelectedBrand(updateBrand);
        if( updateBrand.length ===0 || updateBrand.includes('All')){
         setTableData(assets);
        }
        else{
            const filteredData = assets.filter((product) => updateBrand.includes(product.brand));
            setTableData(filteredData)
        }
      };

    const handleCategory = (item) => {
        let updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(item)) {
            updatedCategories = updatedCategories.filter(cat => cat !== item);
        } else {
            updatedCategories.push(item);
        }
        setSelectedCategories(updatedCategories);
    
        if (updatedCategories.length === 0 || updatedCategories.includes('All')) {
            setTableData(assets);
        } else {
            const filteredData = assets.filter(i => updatedCategories.includes(i.category));
            setTableData(filteredData);
        }
    };
    
    const handleSize = (item) => {
        let updateSize   = [...selectedSizes];
        if (updateSize.includes(item)) {
            updateSize = updateSize.filter(cat => cat !== item);
        } else {
            updateSize.push(item);
        }
        setSelectedSizes(updateSize);
        if(updateSize.length === 0 || updateSize.includes('All')){
            setTableData(assets);
        }
        else{
            const filteredData = assets.filter((product) => updateSize.includes(product.size));
            setTableData(filteredData);
        }
    };
    


    const handlePriceRange = (range) => {
        let updatedPriceRanges = [...selectedPriceRanges];
        if (updatedPriceRanges.includes(range)) {
            updatedPriceRanges = updatedPriceRanges.filter(price => price !== range);
        } else {
            updatedPriceRanges.push(range);
        }
        setSelectedPriceRanges(updatedPriceRanges);
    
        if (updatedPriceRanges.length === 0 || updatedPriceRanges.includes('All')) {
            setTableData(assets);
        } else {
            const filteredData = assets.filter(item => {
                return updatedPriceRanges.some(range => {
                    if (range === 'Below $50') return item.price < 50;
                    if (range === '$50 - $100') return item.price >= 50 && item.price <= 100;
                    if (range === '$100 - $200') return item.price >= 100 && item.price <= 200;
                    if (range === 'Above $200') return item.price > 200;
                });
            });
            setTableData(filteredData);
        }
    };
    

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setTableData(assets);
        } else {
            const searchFilteredData = assets.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setTableData(searchFilteredData);
        }
    };

    const handleNavigate = (id) => {
        navigate('/Product/' + id);
    };

    const handleEdit = (id) => {
        console.log('Edit product with ID:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete product with ID:', id);
    };

    const sortByPrice = (order) => {
        const sortedData = [...tableData].sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
        setTableData(sortedData);
        setSortOrder(order);
    };

    const sortBySize = (order) => {
        const sortedData = [...tableData].sort((a, b) => {
            const sizeA = parseFloat(a.size.match(/\d+/)[0]);
            const sizeB = parseFloat(b.size.match(/\d+/)[0]);
            return order === 'asc' ? sizeA - sizeB : sizeB - sizeA;
        });
        setTableData(sortedData);
        setSortOrder(order);
    };

    const sortByQuantity = (order) => {
        const sortedData = [...tableData].sort((a, b) => {
            return order === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
        });
        setTableData(sortedData);
        setSortOrder(order);
    };

    const sortByRating = (order) => {
        const sortedData = [...tableData].sort((a, b) => {
            return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        });
        setTableData(sortedData);
        setSortOrder(order);
    };

    return (
        <>
            <div className='flex'>
                <Navbar />
                <Sidebar />
                <section className="p-3 bg-gray-400 flex-1 mt-20 ml-52">
                    <div className='flex justify-between p-3 items-center'>
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">Sales Table</h2>
                        <div className='relative space-x-3 flex'>
                        <div className="relative">
    {/* Category Dropdown Button */}
    <button 
        onClick={() => setDropdownOpen(!dropdownOpen)} 
        className="bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
    >
        Categories
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
    </button>
    
    {/* Dropdown List */}
    {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg z-10">
            <ul className="py-2">
                {categories.map((item, index) => (
                    <li key={index} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200">
                        <button 
                            onClick={() => handleCategory(item)} 
                            className="block text-gray-800 w-full text-left"
                        >
                            {item}
                        </button>
                        {selectedCategories.includes(item) && (
                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )}
</div>

<button 
        onClick={() => setSizeDown(!SizeDown)} 
        className="bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
    >
        Size
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
    </button>
   
   {
    SizeDown && (
        <div className="absolute left-32 mt-12 w-32 bg-white rounded-lg shadow overflow-y-auto  max-h-32">
             <ul className="">
                {Sizes.map((item, index) => (
                    <li key={index} className="flex items-center  px-4 py-2 hover:bg-gray-200">
                        <button 
                            onClick={() => handleSize(item)} 
                            className="block text-gray-800 w-full text-left"
                        >
                            {item}
                        </button>
                        {selectedSizes.includes(item) && (
                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
   }


<button 
        onClick={() => setBrandDown(!brandDown)} 
        className="bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
    >
        Brand
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
    </button>

    {
        brandDown && (
            <div className=" absolute left-64 mt-11 w-32  bg-white rounded-lg shadow max-h-40 overflow-y-auto">
                <ul className="">
                {brandNames.map((item, index) => (
                    <li key={index} className="flex items-center  px-4 py-2 hover:bg-gray-200">
                        <button 
                            onClick={() => handleBrandChange(item)} 
                            className="block text-gray-800 w-full text-left"
                        >
                            {item}
                        </button>
                        {selectedBrand.includes(item) && (
                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                        )}
                    </li>
                ))}
            </ul>
            </div>
        )
    }

                            {/* Price Dropdown */}
                            <div className="relative">
    {/* Price Dropdown Button */}
    <button 
        onClick={() => setPriceDropdownOpen(!priceDropdownOpen)} 
        className="bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
    >
        Price
        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
    </button>
    
    {/* Dropdown List */}
    {priceDropdownOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg z-10 overflow-y-auto">
            <ul className="py-2">
                {priceRanges.map((range, index) => (
                    <li key={index} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200">
                        <button 
                            onClick={() => handlePriceRange(range)} 
                            className="block text-gray-800 w-full text-left"
                        >
                            {range}
                        </button>
                        {selectedPriceRanges.includes(range) && (
                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )}
</div>

                            {/* Search Bar */}
                            <input 
                                onChange={handleSearch} 
                                placeholder='search here!' 
                                className='p-3 rounded-xl h-10'
                            />
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className='h-5 cursor-pointer absolute right-3 top-2 text-gray-600'
                            />
                        </div>
                    </div>

                    {/* Product Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 border-b text-center">Image</th>
                                    <th className="py-2 px-4 border-b text-center">Product Name</th>
                                    <th className="py-2 px-4 border-b text-center">Category</th>
                                    <th className="py-2 px-4 border-b text-center">Size
                                        <span className="cursor-pointer" onClick={() => sortBySize('asc')}>
                                            <FontAwesomeIcon icon={faArrowUp} className="text-green-500 ml-2" />
                                        </span>
                                        <span className="cursor-pointer" onClick={() => sortBySize('desc')}>
                                            <FontAwesomeIcon icon= {faArrowDown} className="text-red-500 ml-2" />
                                        </span>
                                    </th>
                                    <th className="py-2 px-4 border-b text-center">Brand</th>
                                    <th className="py-2 px-4 border-b text-center">
                                        Price
                                        <span className="cursor-pointer" onClick={() => sortByPrice('asc')}>
                                            <FontAwesomeIcon icon={faArrowUp} className="text-green-500 ml-2" />
                                        </span>
                                        <span className="cursor-pointer" onClick={() => sortByPrice('desc')}>
                                            <FontAwesomeIcon icon= {faArrowDown} className="text-red-500 ml-2" />
                                        </span>
                                    </th>
                                    <th className="py-2 px-4 border-b text-center">Quantity
                                        <span className="cursor-pointer" onClick={() => sortByQuantity('asc')}>
                                            <FontAwesomeIcon icon={faArrowUp} className="text-green-500 ml-2" />
                                        </span>
                                        <span className="cursor-pointer" onClick={() => sortByQuantity('desc')}>
                                            <FontAwesomeIcon icon={faArrowDown} className="text-red-500 ml-2" />
                                        </span>
                                    </th>
                                    <th className="py-2 px-4 border-b text-center">Rating
                                        <span className="cursor-pointer" onClick={() => sortByRating('asc')}>
                                            <FontAwesomeIcon icon={faArrowUp} className="text-green-500 ml-2" />
                                        </span>
                                        <span className="cursor-pointer" onClick={() => sortByRating('desc')}>
                                            <FontAwesomeIcon icon={faArrowDown} className="text-red-500 ml-2" />
                                        </span>
                                    </th>
                                    <th className="py-2 px-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="py-2 px-4 border-b">
                                            <img src={item.imageUrl} alt={item.name} className="h-16 mx-auto" />
                                        </td>
                                        <td className="py-2 px-4 border-b">{item.name}</td>
                                        <td className="py-2 px-4 border-b">{item.category}</td>
                                        <td className="py-2 px-4 border-b">{item.size}</td>
                                        <td className="py-2 px-4 border-b">{item.brand}</td>
                                        <td className="py-2 px-4 border-b">${item.price}</td>
                                        <td className="py-2 px-4 border-b">{item.quantity}</td>
                                        <td className="py-2 px-4 border-b">
                                            {item.rating}<FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        </td>
                                        <td className="py-2 px-4 border-b space-x-3">
                                            <button onClick={() => handleEdit(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Products