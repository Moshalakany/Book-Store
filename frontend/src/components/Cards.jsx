import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

function Cards({ item }) {
  const AddToCart = ({item}) => {
    const bookId = item._id;
    const handleAddToCart = () => {
      console.log(bookId)
      let result=localStorage.getItem("Users");
        if(!result)
          {
            toast.error("Please Login First");
          }
        const parsedData = JSON.parse(result);
        const token=parsedData.token;
        console.log(token);
        axios.post("http://localhost:4001/cart/add",  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            _id: bookId,
          },
        })
          .then((response) => {
            toast("added to cart")
          })
          .catch((error) => {
            console.log("Error Adding item to cart:", error);
          });
        
    }

    return (
      <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
        <button type="button" onClick={handleAddToCart}> Add To Cart
        </button>  
      </div>
    )
  }

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>Author: {item.author}</p>
          <div className="card-actions justify-between">
          <p className="badge badge-outline">sale:{item.sale}%</p>
          </div>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">price: ${item.price}
            </div>
            <AddToCart item={item} />
          <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
          <button onClick={() => {navigator.clipboard.writeText(item._id)
            toast.success("ID copied Successfully")}
          }>Copy ID</button>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;