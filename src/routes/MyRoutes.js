import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "../components/ProtectedRoute";

const MyRoutes = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default MyRoutes;
