import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../components/Home";
import AddCourse from "../components/AddCourse";
import AllCourses from "../components/AllCourses";
import AddStudent from "../components/AddStudent";
import AllStudents from "../components/AllStudents";
import CollectFee from "../components/CollectFee";
import PaymentHistory from "../components/PaymentHistory";

const Router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/", element: <Home /> },
      { path: "/dashboard/home", element: <Home /> },
      { path: "/dashboard/add-course", element: <AddCourse /> },
      { path: "/dashboard/all-courses", element: <AllCourses /> },
      { path: "/dashboard/add-student", element: <AddStudent /> },
      { path: "/dashboard/all-students", element: <AllStudents /> },
      { path: "/dashboard/collect-fee", element: <CollectFee /> },
      { path: "/dashboard/payment-history", element: <PaymentHistory /> },
    ],
  },
]);

export default Router;
