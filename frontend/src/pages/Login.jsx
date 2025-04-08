import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import API from "../api/API";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      const response = await axios.post(API.login.URL, formData);
      toast.success(response.data?.msg);

      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#FFEC51] to-[#CDC7E5] p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full lg:h-[90vh] rounded-md overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className="bg-[#7776BC] w-full lg:w-1/2 flex justify-center items-center flex-col gap-2 p-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px]"
          />
          <p className="font-bold text-base sm:text-lg md:text-xl text-white text-center">
            Institute Management App
          </p>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 text-center">
            Manage your Institute in an easy way...
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-[#FFFBDB] h-full w-full lg:w-1/2 max-h-screen overflow-y-auto flex flex-col items-center gap-6 p-4 sm:p-6 scrollbar-hide">
          <div className="flex flex-col justify-center items-center h-full w-full gap-6">
            <p className="text-[#192B5D] text-lg sm:text-xl md:text-2xl font-semibold border-b-2">
              Login Here
            </p>

            <form
              onSubmit={submitHandler}
              className="flex flex-col gap-3 w-full max-w-md px-2"
            >
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-[#192B5D]"
              />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-[#192B5D]"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#192B5D] p-2 rounded-md text-white font-semibold w-full sm:w-1/2 lg:w-1/3 mx-auto mt-3 cursor-pointer"
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </form>

            <p className="text-sm md:text-base text-[#192B5D] w-full max-w-md text-center">
              Create a new account?{" "}
              <Link to={"/signup"} className="font-semibold border-b-2">
                Signup Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
