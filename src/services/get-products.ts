/* eslint-disable no-console */
import axios from "axios";

const getProducts = async (accessToken: string) => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(`${apiHost}/${projectKey}/products`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getProducts;
