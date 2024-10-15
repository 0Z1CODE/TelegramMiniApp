import axios from "axios";

const baseURL = process.env.SERVER_URL

console.log(baseURL);


const $api = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});


export default $api;