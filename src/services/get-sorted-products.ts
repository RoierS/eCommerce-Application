/* eslint-disable no-console */
import axios from "axios";

const getSortedProducts = async (sortingOption: string) => {
  const tokenObject = JSON.parse(localStorage.getItem("tokenObject") || "null");
  const accessToken = tokenObject?.access_token || "";
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const queryParams = {
    sort: sortingOption,
  };

  try {
    const response = await axios.get(
      `${apiHost}/${projectKey}/product-projections/search`,
      {
        headers,
        params: queryParams,
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching sorted products:", error);
    throw error;
  }
};

export default getSortedProducts;
