import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState(""); // add category state
  const [searchTerm, setSearchTerm] = useState(""); // add search term state

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        let tosearch=res.data
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
  return (
    <>
      <Navbar />
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            <h4 className="text-1xl  md:text-2xl">
            Welcome
            </h4>
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
          <p>
            <br />
          </p>
          <p className="text-pink-400">
            <h3 className="text-1xl  md:text-2xl">
            you can search By name or category Here
            </h3>
          </p>
          <p>
            <br />
          </p>
        </div>
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


        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
