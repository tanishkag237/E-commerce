import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import Profile from "../pages/Profile";
import ManageProducts from "../pages/admin/ManageProducts";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/users/UserDashboard";
import ViewUsers from "../pages/admin/ViewUsers";
import ProductsPage from "../pages/ProductsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<Profile />} />

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/products" element={<UserDashboard />}/>
               
               <Route path="/products/:id" element={<ProductsPage  />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/manage-products"
                element={<ManageProducts />}
              />
              <Route path="/admin/dashboard/:id" element={<ProductsPage />} /> 
              <Route path="/admin/view-users" element={<ViewUsers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
