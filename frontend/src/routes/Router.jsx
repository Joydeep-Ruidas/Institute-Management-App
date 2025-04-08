import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {path:"/dashboard", element:<Dashboard/>}
]);

export default Router;
