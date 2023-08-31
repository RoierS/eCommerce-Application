/* eslint-disable no-console */
import axios from "axios";

interface QueryParams {
  sort?: string;
}

const getFilteredAndSortedProducts = async (
  filterCriteria: Record<string, string>,
  sortingOption: string
) => {
  try {
    const tokenObject = JSON.parse(
      localStorage.getItem("tokenObject") || "null"
    );
    const accessToken = tokenObject?.access_token || "";
    const apiHost = process.env.REACT_APP_API_HOST;
    const projectKey = process.env.REACT_APP_PROJECT_KEY;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const filterQueryString = Object.entries(filterCriteria)
      .map(
        ([key, value]) =>
          `filter=${encodeURIComponent(key)}:${encodeURIComponent(value)}`
      )
      .join("&");

    const queryParams: QueryParams = {};

    if (sortingOption) {
      queryParams.sort = sortingOption;
    }

    const response = await axios.get(
      `${apiHost}/${projectKey}/product-projections/search?${filterQueryString}`,
      {
        headers,
        params: queryParams,
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching filtered and sorted products:", error);
    throw error;
  }
};

export default getFilteredAndSortedProducts;
