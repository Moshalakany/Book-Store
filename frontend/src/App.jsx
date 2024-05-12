import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import EditUser from "./components/EditUser";
//import Admin from "./components/Admin";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
// import { AdminAuth } from "./context/AuthAdmin";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  //const [authUser1, setAuthUser1, isAdmin, setIsAdmin] = AdminAuth();
  console.log(authUser);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/Cart" element={authUser ? <Cart/> : <Navigate to="/signup" />}
          />
            <Route path="/EditUser" element={authUser ? <EditUser/> : <Navigate to="/signup" />}
          />
                  { <Route path="/Admin" element={authUser ? <Admin/> : <Navigate to="/signup" />}
          /> }

          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
