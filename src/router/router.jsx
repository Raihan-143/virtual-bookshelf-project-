import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import BookShelf from "../Pages/BookShelf";
import BookDetails from "../Pages/BookDetails";
import PrivateRoute from "../routes/PrivateRoute";
import AddBook from "../Pages/AddBook";
import MyBooks from "../Pages/MyBooks";
import UpdateBook from "../Pages/UpdateBook";
import Profile from "../Pages/Profile";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
          path:'bookshelf',
          Component:BookShelf,
        },
        {
          path:'/books/:id',
          element:<PrivateRoute><BookDetails></BookDetails></PrivateRoute>
        },
        {
          path:'/add-book',
          element:<PrivateRoute><AddBook></AddBook></PrivateRoute>
        },
        {
          path:'/my-books',
          element:<PrivateRoute><MyBooks></MyBooks></PrivateRoute>
        },
        {
          path:'/update-books/:id',
          element:<PrivateRoute><UpdateBook></UpdateBook></PrivateRoute>
        },
        {
          path:'/profile',
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
        },
        {
            path:'/register',
            Component:Register,
        },
        {
            path:'/login',
            Component:Login,
        },
        {
          path:'*',
          Component:ErrorPage
        },
    ]
  },
]);

export default router;