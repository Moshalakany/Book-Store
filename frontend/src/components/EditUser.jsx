import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function EditUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("Users"));
  console.log(user);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedUserInfo = {
        name: data.name,
        password: data.password,
      };
      const res = await axios.patch("http://localhost:4001/user/edit", updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data);
      toast.success("Account information updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating account information");
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            Manage your Account{" "}
            <span className="text-pink-500"> Here! </span>
          </h1>
          <div>
            
          <p className="mt-12">
            Edit your account information here. 
            You can change your name and password</p>
          </div>
        </div>
      </div>
    <div className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          {/* Name */}
          <div className="mt-4 space-y-2">
            <label className="text-white">Name</label>
            <input
              type="text"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("name", { required: true })}
              defaultValue={user.name}
            />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          {/* Password */}
          <div className="mt-4 space-y-2">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="w-80 px-3 py-1 border rounded-md outline-none"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          {/* Button */}
          <div className="flex justify-around mt-6">
            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default EditUser;
