import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
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

      const {
        email,
        firstName,
        lastName,
        instituteName,
        imageURL,
        imageID,
        token,
      } = response.data.userData;

      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          firstName,
          lastName,
          instituteName,
          imageURL,
          imageID,
          token,
        })
      );

      toast.success(response.data?.msg);

      setFormData({ email: "", password: "" });

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* 🚫 Mobile Message */}
      <div className="sm:hidden flex justify-center items-center min-h-screen bg-[#ffe9f4] px-4 text-center">
        <p className="text-[#E90074] font-semibold text-lg">
          This app is not user-friendly on mobile devices.
          <br /> Please use a tablet, laptop, or desktop.
        </p>
      </div>

      {/* ✅ Actual Login Form (Hidden on Mobile) */}
      <div className="hidden sm:flex justify-center items-center min-h-screen bg-gradient-to-r from-[#E90074] to-[#dbbeca] p-4">
        <div className="flex flex-col lg:flex-row w-[95%] h-full lg:h-[90vh] rounded-md overflow-hidden">
          {/* Left Section */}
          <div className="bg-[#eef608] w-full lg:w-1/2 flex justify-center items-center flex-col gap-2 p-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px]"
            />
            <p className="font-bold text-base sm:text-lg md:text-xl text-[#E90074] text-center">
              Institute Management App
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#8d385b] text-center">
              Manage your Institute in an easy way...
            </p>
          </div>

          {/* Right Section */}
          <div className="bg-white h-full w-full lg:w-1/2 max-h-screen overflow-y-auto flex flex-col items-center gap-6 p-4 sm:p-6 scrollbar-hide">
            <div className="flex flex-col justify-center items-center h-full w-full gap-6">
              <p className="text-[#E90074] text-lg sm:text-xl md:text-2xl font-semibold border-b-2 py-2">
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
                  className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#E90074] p-2 rounded-md text-white font-semibold w-full sm:w-1/2 lg:w-1/3 mx-auto mt-3 cursor-pointer hover:bg-[#FF4191]"
                >
                  {loading ? <Loader /> : "Login"}
                </button>
              </form>

              <p className="text-sm md:text-base text-[#8d385b] w-full max-w-md text-center">
                Create a new account?{" "}
                <Link
                  to={"/signup"}
                  className="font-semibold border-b-2 text-[#E90074] hover:text-[#FF4191]"
                >
                  Signup Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
