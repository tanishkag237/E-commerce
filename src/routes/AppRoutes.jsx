import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import ManageProducts from "../pages/admin/ManageProducts";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/users/UserDashboard";
import PageNotFound from "../pages/PageNotFound";
import { Suspense } from "react";
import Loader from "../components/common/Loader";


const Profile = React.lazy(()=> import("../pages/Profile"));
const ViewUsers = React.lazy(()=>import("../pages/admin/ViewUsers"))
const ProductsPage = React.lazy(()=>import("../pages/ProductsPage"))

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
          
            <Route path="/profile" element={<Suspense fallback={<Loader/>}><Profile/></Suspense>} />

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/products" element={<UserDashboard />}/>
               
               <Route path="/products/:id" element={<Suspense fallback={<Loader/>}><ProductsPage/></Suspense>} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/manage-products"
                element={<ManageProducts />}
              />
              <Route path="/admin/dashboard/:id" element={<ProductsPage />} /> 
              <Route path="/admin/view-users" element={<Suspense fallback={<Loader/>}><ViewUsers/></Suspense>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
