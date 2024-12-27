
//TESTING FOR LOCAL DEVELOPMENT
// import axios from "axios";

// export default axios.create({
//     baseURL: 'http://localhost:3500'
// });

// export const axiosPrivate = axios.create({
//     baseURL: "http://localhost:3500",
//     withCredentials: true,
//   });


  //TESTING FOR PRODUCTION
  import axios from "axios";

// Get the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3500';

console.log("Base URL:", BASE_URL);

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
