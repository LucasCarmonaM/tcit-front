import Axios from "axios";
import ENV from "../config/env.json";
const useAxios = Axios.create({ baseURL: ENV["URL_BASE"] });
export default useAxios;
