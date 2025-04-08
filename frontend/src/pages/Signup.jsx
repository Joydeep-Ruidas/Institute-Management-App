import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import axios from "axios";
import API from "../api/API";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    instituteName: "",
    phone: "",
    email: "",
    password: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // storing file object
      }));
    }
  };

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
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      const userData = await axios.post(API.signup.URL, payload);
      console.log("Response from server:", userData);
      toast.success(userData.data?.msg);

      setFormData({
        firstName: "",
        lastName: "",
        instituteName: "",
        phone: "",
        email: "",
        password: "",
        image: "",
      });

      navigate("/login");
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
        <div className="bg-[#FFFBDB] w-full lg:w-1/2 max-h-screen overflow-y-auto flex flex-col items-center gap-6 p-4 sm:p-6 scrollbar-hide">
          <p className="text-[#192B5D] text-lg sm:text-xl md:text-2xl font-semibold border-b-2">
            Signup Here
          </p>

          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 w-full max-w-md px-2"
          >
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border rounded-md p-2 text-[#192B5D]"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border rounded-md p-2 text-[#192B5D]"
            />
            <input
              type="text"
              placeholder="Enter Institute Name"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
              className="border rounded-md p-2 text-[#192B5D]"
            />
            <input
              type="number"
              placeholder="Enter Phone No."
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border rounded-md p-2 text-[#192B5D]"
            />
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

            {/* File Upload + Preview Side-by-Side */}
            <div className="flex items-center justify-center gap-4">
              {/* Upload Box */}
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="fileUpload"
                  className="border-2 border-dashed border-[#192B5D] w-20 h-20 flex justify-center items-center rounded-md cursor-pointer text-[#192B5D] hover:bg-[#f5f5f5] transition"
                >
                  <MdOutlineAddPhotoAlternate className="text-2xl" />
                </label>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="w-20 h-20">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md border border-[#192B5D]"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#192B5D] p-2 rounded-md text-white font-semibold w-full sm:w-1/2 lg:w-1/3 mx-auto mt-3 cursor-pointer"
            >
              {loading ? <Loader /> : "Signup"}
            </button>
          </form>

          <p className="text-sm md:text-base text-[#192B5D] w-full max-w-md text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold border-b-2">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
