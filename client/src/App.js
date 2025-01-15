import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Product from "./product/getproduct/Product";
import Category from "./category/getcategory/Category.jsx";
import AddProduct from "./product/addproduct/AddProduct";
import UpdateProduct from "./product/updateproduct/Update.jsx";
import AddCategory from "./category/addcategory/AddCategory.jsx";
import UpdateCategory from "./category/updatecategory/Update.jsx";
import Home from "./Home.js";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Product />,
    },
    {
      path: "/categories",
      element: <Category />,
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
    {
      path: "/add-category", // Route thêm danh mục
      element: <AddCategory />,
    },
    {
      path: "/update/product/:id",
      element: <UpdateProduct />,
    },
    {
      path: "/update/category/:id",
      element: <UpdateCategory />,
    },


  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
