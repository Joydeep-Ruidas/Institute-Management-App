const baseURL = "http://localhost:5000";

const API = {
  signup: { URL: `${baseURL}/user/signup` },
  login: { URL: `${baseURL}/user/login` },
  addCourse: { URL: `${baseURL}/course/add-course` },
};

export default API;
