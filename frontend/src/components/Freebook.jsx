import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState(""); // add category state
  const [searchTerm, setSearchTerm] = useState(""); // add search term state

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        const data = res.data.filter((data) => data.price === 0);
        let tosearch=data
        if (category) {
          tosearch  = tosearch.filter((book) => book.category.toLowerCase() === category.toLowerCase());
        }

        if (searchTerm) {
          tosearch = tosearch.filter((book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        console.log(tosearch);
        setBook(tosearch);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [category, searchTerm]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            you can view all free books here
          </p>
        <div className="hidden md:block">
        <label className=" px-3 py-2 border rounded-md flex items-center gap-2">
         {/* Add category dropdown or list */}
         <select value={category} onChange={(e) => setCategory(e.target.value)}
         className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white">
            <option value="">All Categories</option>
            <option value="comedy">comedy</option>
            <option value="fiction">fiction</option>
            <option value="horror">horror</option>
            <option value="romantic">romantic</option>
            <option value="kitchen">kitchen</option>
            <option value="science">science</option>
            <option value="math">math</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
            <option value="biography">biography</option>
            <option value="selfhelp">selfhelp</option>
            <option value="health">health</option>
            <option value="travel">travel</option>
            <option value="biography">biography</option>
          </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

 
          </div>
          <div className="hidden md:block">
        <label className=" px-3 py-2 border rounded-md flex items-center gap-2">
         {/* Add category dropdown or list */}
          {/* Add search input field */}
          <input
            type="search"
            className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

 
          </div>

        </div>
        <div>
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Freebook;