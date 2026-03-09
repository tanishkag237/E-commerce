import { createContext, useReducer, useState } from "react";
import { authReducer, initialState } from "../features/auth/authReducer";
import { loginUser } from "../api/auth.api";
import { getAllUsers } from "../api/users.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    const token = await loginUser(credentials);
    const role = credentials.username ==="mor_2314" ? "admin" : "user"
    const users = await getAllUsers();
    console.log("All user : ",users)

    const matchedUser = users.find(
    (u) => u.username === credentials.username
  );
  console.log("All user : ",matchedUser)

  

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(matchedUser));

    dispatch({
        type:'LOGIN_SUCCESS',
        payload:{ user:matchedUser, role, token}
    })
    return { role };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });

  };

  return (
    <AuthContext.Provider value={{...state, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};
