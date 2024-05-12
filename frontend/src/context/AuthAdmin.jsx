import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser? JSON.parse(initialAuthUser) : undefined
  );
  const [isAdmin, setIsAdmin] = useState(initialAuthUser? initialAuthUser.isAdmin : false);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, isAdmin, setIsAdmin]}>
      {children}
    </AuthContext.Provider>
  );
}
export const AdminAuth = () => useContext(AuthContext);