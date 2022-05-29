import axios from "axios";
import { BASE_URL_CAT } from "../api/api";

export const getNavigationStaticProps = async () => {
  try {
    const response = await axios.get(BASE_URL_CAT);

    console.log(response.data);
    return {
      brands: response.data.filter((category) => category.parent === 0),
      error: "",
    };
  } catch (error) {
    return {
      brands: [],
      error: error.toString(),
    };
  }
};
