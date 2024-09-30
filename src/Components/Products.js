import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCaretDown,
  faArrowUp,
  faArrowDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { useNavigate } from "react-router-dom";
import {
  db,
  collection,
  query,
  getDocs,
  where,
  limit,
  startAfter,
} from "../config/FirebaseConfig.js"; // Import Firebase config

const Products = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [SizeDown, setSizeDown] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [error, setError] = useState(null);
  const [brandDown, setBrandDown] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [lastVisibleDocs, setLastVisibleDocs] = useState({}); // Store last visible documents for each page

  const [totalProducts, setTotalProducts] = useState(0); // Total products count
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  useEffect(() => {
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => doc.data());

      // Extract unique categories, brands, and sizes
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      const uniqueBrands = [
        ...new Set(products.map((product) => product.brand)),
      ];
      const uniqueSizes = [...new Set(products.map((product) => product.size))];

      setCategories([...uniqueCategories, "All"]);
      setBrands([...uniqueBrands, "All"]);
      setSizes([...uniqueSizes, "All"]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const pageSize = 10; // Number of products to fetch per page

  useEffect(() => {
    fetchData(false, selectedCategories, selectedBrand, selectedSizes, currentPage);
    countTotalProducts(selectedCategories, selectedBrand, selectedSizes);
  }, [currentPage, selectedCategories, selectedBrand, selectedSizes]);
  // Function to count total products based on filters
  const countTotalProducts = async (
    categories = selectedCategories,
    brands = selectedBrand,
    sizes = selectedSizes
  ) => {
    try {
      let q = query(collection(db, "products"));

      if (categories.length > 0 && !categories.includes("All")) {
        q = query(q, where("category", "in", categories));
      }
      if (brands.length > 0 && !brands.includes("All")) {
        q = query(q, where("brand", "in", brands));
      }
      if (sizes.length > 0 && !sizes.includes("All")) {
        q = query(q, where("size", "in", sizes));
      }

      const querySnapshot = await getDocs(q);
      setTotalProducts(querySnapshot.size); // Set total count of products
      setTotalPages(Math.ceil(querySnapshot.size / pageSize)); // Calculate total pages
    } catch (err) {
      setError("Error counting total products");
    }
  };

// Function to fetch paginated products
const fetchData = async (
  categories = selectedCategories,
  brands = selectedBrand,
  sizes = selectedSizes,
  currentPage = 1 // Pass currentPage to control pagination
) => {
  try {
    setLoading(true);
    let q = query(collection(db, "products"));

    // Apply filters for categories, brands, and sizes
    if (categories.length > 0 && !categories.includes("All")) {
      q = query(q, where("category", "in", categories));
    }
    if (brands.length > 0 && !brands.includes("All")) {
      q = query(q, where("brand", "in", brands));
    }
    if (sizes.length > 0 && !sizes.includes("All")) {
      q = query(q, where("size", "in", sizes));
    }

    // Determine whether we need to use `startAfter` for pagination
    if (currentPage > 1) {
      const lastVisibleDoc = lastVisibleDocs[currentPage - 1]; // Get the last visible document for the previous page
      if (lastVisibleDoc) {
        q = query(q, startAfter(lastVisibleDoc));
      }
    }

    // Fetch the products for the current page
    const querySnapshot = await getDocs(query(q, limit(pageSize)));

    if (querySnapshot.empty) {
      setTableData([]); // Handle case where no data is found
    } else {
      const products = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTableData(products); // Set the table data for the current page

      // Store the last visible document for the current page
      setLastVisibleDocs((prev) => ({
        ...prev,
        [currentPage]: querySnapshot.docs[querySnapshot.docs.length - 1],
      }));
    }

    setError(null);
  } catch (err) {
    setError("Error fetching data");
  } finally {
    setLoading(false);
  }
};


  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };



  const handleCategory = (item) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(item)) {
      updatedCategories = updatedCategories.filter((cat) => cat !== item);
    } else {
      updatedCategories.push(item);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleBrandChange = (item) => {
    let updateBrand = [...selectedBrand];
    if (updateBrand.includes(item)) {
      updateBrand = updateBrand.filter((brand) => brand !== item);
    } else {
      updateBrand.push(item);
    }
    setSelectedBrand(updateBrand);
  };

  const handleSize = (item) => {
    let updateSize = [...selectedSizes];
    if (updateSize.includes(item)) {
      updateSize = updateSize.filter((size) => size !== item);
    } else {
      updateSize.push(item);
    }
    setSelectedSizes(updateSize);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      fetchData();
    } else {
      const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setTableData(filteredData);
    }
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <Sidebar />
        <section className="p-3 bg-gray-400 flex-1 mt-20 ml-52">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-400 bg-opacity-50">
              <p>Loading...</p>
            </div>
          )}
          <div className="flex justify-between p-3 items-center">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">
              Products
            </h2>
            <div className="relative space-x-3 flex">
              <div className="relative space-x-3 flex">
                {/* Category Filter */}
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
                    type="button"
                    id="dropdownMenuButton"
                    aria-expanded="false"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Categories
                  </button>
                  {dropdownOpen && (
                    <ul
                      className="dropdown-menu show bg-black text-white w-32 z-10"
                      aria-labelledby="dropdownMenuButton"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      {categories.map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleCategory(item)}
                            className="dropdown-item text-white"
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {item}
                            {selectedCategories.includes(item) && (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-green-500 float-right"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Size Filter */}
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
                    type="button"
                    id="dropdownMenuButton"
                    aria-expanded="false"
                    onClick={() => setSizeDown(!SizeDown)}
                  >
                    Sizes
                  </button>
                  {SizeDown && (
                    <ul
                      className="dropdown-menu show bg-black text-white w-32 z-10"
                      aria-labelledby="dropdownMenuButton"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      {sizes.map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSize(item)}
                            className="dropdown-item text-white"
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {item}
                            {selectedSizes.includes(item) && (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-green-500 float-right"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Brand Filter */}
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-gray-800 text-white font-medium w-32 h-10 rounded-lg flex items-center justify-between px-4"
                    type="button"
                    id="dropdownMenuButton"
                    aria-expanded="false"
                    onClick={() => setBrandDown(!brandDown)}
                  >
                    Brands
                  </button>
                  {brandDown && (
                    <ul
                      className="dropdown-menu show bg-black text-white w-32 z-10"
                      aria-labelledby="dropdownMenuButton"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      {brands.map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleBrandChange(item)}
                            className="dropdown-item text-white"
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {item}
                            {selectedBrand.includes(item) && (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-green-500 float-right"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <input
                onChange={handleSearch}
                placeholder="Search here!"
                className="p-3 rounded-xl h-10"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="h-5 cursor-pointer absolute right-3 top-2 text-gray-600"
              />
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b text-center">Image</th>
                  <th className="py-2 px-4 border-b text-center">
                    Product Name
                  </th>
                  <th className="py-2 px-4 border-b text-center">Category</th>
                  <th className="py-2 px-4 border-b text-center">Size</th>
                  <th className="py-2 px-4 border-b text-center">Brand</th>
                  <th className="py-2 px-4 border-b text-center">Price</th>
                  <th className="py-2 px-4 border-b text-center">Rating</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No data
                    </td>
                  </tr>
                ) : (
                  tableData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="py-2 px-4 border-b">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-16 mx-auto"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.category}</td>
                      <td className="py-2 px-4 border-b">{item.size}</td>
                      <td className="py-2 px-4 border-b">{item.brand}</td>
                      <td className="py-2 px-4 border-b">${item.price}</td>
                      <td className="py-2 px-4 border-b">
                        {item.rating}
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500 ml-2"
                        />
                      </td>
                      <td className="py-2 px-4 border-b space-x-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bootstrap Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Show total products */}
          <p className="text-center mt-3">Total Products: {totalProducts}</p>
        </section>
      </div>
    </>
  );
};

export default Products;
