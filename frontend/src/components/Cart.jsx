import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import axios from "axios";

function Cart  ({ item })  {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
let result=localStorage.getItem("Users");
const parsedData = JSON.parse(result);
const token=parsedData.token;
axios.get("http://localhost:4001/cart",{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then((response) => {
        setCartItems(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const RemoveFromCart = ({item}) => {
    const bookId = item._id;
    console.log(bookId)
  const handleRemoveFromCart = () => {

    let result=localStorage.getItem("Users");
    const parsedData = JSON.parse(result);
    const token=parsedData.token;
    console.log(bookId);
    axios.delete("http://localhost:4001/cart/delete",  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        _id: bookId,
      },
    })
      .then((response) => {
        setCartItems(cartItems.filter(item => item._id !== bookId));
      })
      .catch((error) => {
        console.log("Error removing item from cart:", error);
      });
  }
  return (
    <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
      <button type="button" onClick={handleRemoveFromCart}> Remove From Cart
      </button>  
    </div>
  )


}

  const totalPrice = cartItems.reduce((total, item) => total + (item.price - (item.price * item.sale / 100)), 0);    return (
<>
      
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Shopping Cart <span className="text-pink-500"> Here! </span>
          </h1>
          {cartItems.length === 0 ? (
            <p className="mt-12">
              Your cart is empty.
            </p>
          ) : (
            <>
          <h1 className="text-2xl md:text-4xl">
            <br />
          <div>Total Price: ${totalPrice}</div>
          </h1>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
              {cartItems.map((item) => (
                  <div key={item._id} className="mt-4 my-3 p-3">
                    <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                      <figure>
                        <img src={item.image} alt="Shoes" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">
                          {item.name}
                          <div className="badge badge-secondary">
                            {item.category}
                          </div>
                        </h2>
                        <p>Author: {item.author}</p>
                        <div className="card-actions justify-between">
                          <p className="badge badge-outline hover:bg-pink-500 hover:text-white">
                            sale: {item.sale}%
                          </p>
                        </div>
                        <div className="card-actions justify-between">
                          <div className="badge badge-outline hover:bg-pink-500 hover:text-white">
                            price after sale: $
                            {item.price-(item.price * item.sale / 100)}
                            
                          </div>
                            <RemoveFromCart item={item} />
                          <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover text-white duration-200">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item._id);
                                toast.success("ID copied Successfully");
                              }}
                            >
                              Copy ID
                            </button>
                            
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                <button>Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />      
      </>
    );
  }

  export default Cart;