/* eslint-disable no-console */
import axios from "axios";

const searchProducts = async (searchQuery: string) => {
  const tokenObject = JSON.parse(localStorage.getItem("tokenObject") || "null");
  const accessToken = tokenObject?.access_token || "";
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const availableLanguages = ["en-US", "pl", "ru"];
  const queryParams: Record<string, string> = {};

  // search in different languages
  availableLanguages.forEach((language: string) => {
    queryParams[`text.${language}`] = searchQuery;
  });

  queryParams.fuzzy = "true";
  queryParams.fuzzyLevel = "1";

  try {
    const response = await axios.get(
      `${apiHost}/${projectKey}/product-projections/search`,
      {
        headers,
        params: queryParams,
      }
    );
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error searching products:", error);
    throw error;
  }
};

export default searchProducts;
