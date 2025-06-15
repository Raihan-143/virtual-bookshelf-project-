import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import BookShelf from "../Pages/BookShelf";

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
            path:'/register',
            Component:Register,
        },
        {
            path:'/login',
            Component:Login,
        }
    ]
  },
]);

export default router;