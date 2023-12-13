import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useCookies } from 'react-cookie';


const Wishlist = () => {
  const [headers, setHeaders] = useState();
  const [token] = useCookies(["token"]);
  const [products, setProducts] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;
  const totalPages = Math.ceil(products.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentItems = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 3;
  const indexOfLastButton = Math.min(
    Math.max(currentPage + maxVisibleButtons - 1, maxVisibleButtons),
    pageNumbers.length
  );
  const indexOfFirstButton = Math.max(indexOfLastButton - maxVisibleButtons, 0);

  const visiblePageNumbers = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // fetch wishlist products
  useEffect(() => {
  setHeaders({ token: token });

    axios.get("http://localhost:5000/wishlist",
      {
        headers: headers,
      })
        .then((response) => {
          // Handle the response data here
          setProducts(response.data);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
  }, []);

  const addToCart = async (id) => {
    //   try {
    //     const response = await axios.post('https://fakestoreapi.com/carts', {
    //       "quantity" : product,
    //       "id" : id
    //         });
    //     if (response.status === 201) {
    //       alert("Added to cart successfully!");
    //       setCart([...cart, blogPost]);
    //     }
    //   } catch (error) {
    //     console.log("Error adding to cart:", error);
        
    //   }
    };

  return (
    <div>
      <div className="my-16">
        <div className="relative flex flex-wrap gap-7 justify-center items-center mx-16">
          {currentItems.map((product, id) => (
            <div
              key={id}
              className="group my-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <Link
                to={`/product/${product.id}`}
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              >
                <img
                  className="peer absolute border top-0 right-0 h-full w-full object-cover"
                  src={product.image[0]}
                  alt="product image"
                />
                <img
                  className="peer absolute top-0 border -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                  src={product.image[1]}
                  alt="product image"
                />
                {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
              </Link>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl text-start h-8 mb-5 overflow-hidden tracking-tight text-slate-900">
                    {product.title}
                  </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    {/* <span className="text-3xl font-bold  line-through text-teal-600">${product.price}</span> */}
                    <span className="text-lg font-bold text-slate-900">
                      ${product.price}
                    </span>
                  </p>
                </div>
                <button
                  onClick={addToCart(product.id)}
                  className="w-full flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 border text-black rounded-lg shadow "
            >
              Previous Page
            </button>
            <ul className="flex list-none">
              {visiblePageNumbers.map((number) => (
                <li key={number} className="mx-1">
                  <button
                    onClick={() => paginate(number)}
                    className={`${
                      currentPage === number
                        ? "bg-teal-800 w-10 font-bold text-white"
                        : "bg-teal-600 w-10 text-white"
                    } py-2 px-3 focus:outline-none rounded-lg`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(products.length / productPerPage)
              }
              className="px-4 py-2 border text-black rounded-lg shadow"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
