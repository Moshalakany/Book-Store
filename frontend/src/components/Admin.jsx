import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cards from "./Cards";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import User from "../../../Backend/model/user.model";

const AdminComponent = () => {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

let result=localStorage.getItem("Users");
const user = JSON.parse(result);
const token=user.token;

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");  
        const data = res.data;
        let tosearch = data;

        if (category) {
          tosearch = tosearch.filter(
            (book) => book.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (searchTerm) {
          tosearch = tosearch.filter((book) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setBook(tosearch);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, [category, searchTerm]);

  const handleAddBook = async (values, actions) => {
    try {
      await axios.post("http://localhost:4001/admin/books/add", values);
      actions.resetForm();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleUpdateBook = async (values, actions) => {
    try {
      await axios.put("http://localhost:4001/admin/books/update", values);
      actions.resetForm();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete("http://localhost:4001/admin/books/remove", {
        data: {
          _id: bookId,
        },
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }

  };
if(user.isAdmin==false)
  {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
      <h1 className="text-2xl md:text-4xl">
        un Authorized access <span className="text-pink-500">You do not have Admin permission  :)</span>
      </h1>
      <Link to="/">
        <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
          Back
        </button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-12">
          <h4 className="text-1xl md:text-2xl">Welcome</h4>
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
          <br />
          <br />
        <Formik
          initialValues={{
            deleteBookId: "",
            updateBookId: "",
            updateName: "",
            updatePrice: "",
            updateCategory: "",
            updateImage: "",
            updateAuthor: "",
            updateQuantity: "",
            updateSale: "",
            addName: "",
            addPrice: "",
            addCategory: "",
            addImage: "",
            addAuthor: "",
            addQuantity: "",
            addSale: "",
          }}
          onSubmit={(values, actions) => {
            // Handle Formik submit here
          }}
        >
          <Form>
            <section className="text-2xl md:text-2xl">
              <h2 className="text-1xl md:text-2xl">Delete</h2>
              <Field type="text" name="deleteBookId" placeholder="Book ID" />
              <br />
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="button" onClick={() => handleDeleteBook(values.deleteBookId)}>
                Delete
              </button>
            </section>
            <br />
            <br />
            <section className="text-2xl md:text-2xl">
              <h2 className="text-1xl md:text-2xl">Update</h2>
              <Field type="text" name="updateBookId" placeholder="Book ID" />
              <Field type="text" name="updateName" placeholder="Name" />
              <Field type="number" name="updatePrice" placeholder="Price" />
              <Field type="text" name="updateCategory" placeholder="Category" />
              <Field type="text" name="updateImage" placeholder="Image" />
              <Field type="text" name="updateAuthor" placeholder="Author" />
              <Field type="number" name="updateQuantity" placeholder="Quantity" />
              <Field type="number" name="updateSale" placeholder="Sale" />
              <br />
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="button" onClick={() => handleUpdateBook(values)}>
                Update
              </button>
            </section>
            <br />
            <br />
            <section className="text-2xl md:text-2xl">
              <h2 className="text-1xl md:text-2xl">Add</h2>
              <Field type="text" name="addName" placeholder="Name" />
              <Field type="number" name="addPrice" placeholder="Price" />
              <Field type="text" name="addCategory" placeholder="Category" />
              <Field type="text" name="addImage" placeholder="Image" />
              <Field type="text" name="addAuthor" placeholder="Author" />
              <Field type="number" name="addQuantity" placeholder="Quantity" />
              <Field type="number" name="addSale" placeholder="Sale" />
              <br />
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300" type="button" onClick={() => handleAddBook(values)}>
                Add
              </button>
            </section>
            <br />
          </Form>
        </Formik>
        <p className="text-pink-400">
          <h3 className="text-1xl md:text-2xl">You can search By name or category Here</h3>
        </p>
        <div className="flex items-center gap-4 mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none rounded-md px-3 py-2 border dark:bg-slate-900 dark:text-white"
          >
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
            {/* Add other options */}
          </select>
          <input
            type="search"
            className="outline-none rounded-md px-3 py-2 border dark:bg-slate-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminComponent;
