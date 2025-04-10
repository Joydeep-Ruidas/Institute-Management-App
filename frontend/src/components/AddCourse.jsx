import axios from "axios";
import React, { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import API from "../api/API";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    price: "",
    description: "",
    startingDate: "",
    endDate: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // storing file object
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      const courseData = await axios.post(API.addCourse.URL, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success(courseData.data?.msg);

      setFormData({
        courseName: "",
        price: "",
        description: "",
        startingDate: "",
        endDate: "",
        image: "",
      });

      navigate("/dashboard/all-courses");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 w-full justify-center items-center overflow-y-auto">
      <p className="text-[#E90074] text-lg sm:text-xl md:text-2xl font-semibold border-b-2">
        Add New Course
      </p>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center gap-3 w-full px-2"
      >
        <input
          type="text"
          placeholder="Enter Course Name"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
          className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
        />
        <input
          type="text"
          placeholder="Enter price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
        />
        <input
          type="text"
          placeholder="Enter starting Date"
          name="startingDate"
          value={formData.startingDate}
          onChange={handleChange}
          required
          className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
        />
        <input
          type="text"
          placeholder="Enter end Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="border border-[#FF4191] focus:border-[#FF4191] focus:outline-none rounded-md p-2 text-black"
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
              className="border-2 border-dashed border-[#FF4191] w-20 h-20 flex justify-center items-center rounded-md cursor-pointer text-[#FF4191] transition"
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
                className="w-full h-full object-cover rounded-md border border-[#FF4191]"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#E90074] hover:bg-[#FF4191] p-2 rounded-md text-white font-semibold w-full sm:w-1/2 lg:w-1/3 mx-auto mt-3 cursor-pointer"
        >
          {loading ? <Loader /> : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
