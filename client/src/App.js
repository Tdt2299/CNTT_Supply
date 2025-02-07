import "./App.css";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Page components
import Home from "./Home";
import Login from "./components/Login";
import Product from "./product/getproduct/Product";
import Category from "./category/getcategory/Category";
import AddProduct from "./product/addproduct/AddProduct";
import UpdateProduct from "./product/updateproduct/Update";
import AddCategory from "./category/addcategory/AddCategory";
import UpdateCategory from "./category/updatecategory/Update";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    )
  },
  {
    path: "/products",
    element: (
      <PrivateRoute>
        <Product />
      </PrivateRoute>
    )
  },
  {
    path: "/categories",
    element: (
      <PrivateRoute>
        <Category />
      </PrivateRoute>
    )
  },
  {
    path: "/add-product",
    element: (
      <PrivateRoute>
        <AddProduct />
      </PrivateRoute>
    )
  },
  {
    path: "/add-category",
    element: (
      <PrivateRoute>
        <AddCategory />
      </PrivateRoute>
    )
  },
  {
    path: "/update/product/:id",
    element: (
      <PrivateRoute>
        <UpdateProduct />
      </PrivateRoute>
    )
  },
  {
    path: "/update/category/:id",
    element: (
      <PrivateRoute>
        <UpdateCategory />
      </PrivateRoute>
    )
  }
]);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;