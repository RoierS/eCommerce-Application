/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import FilterComponent from "@components/filter/filter";
import AppHeader from "@components/header/header";
import SearchField from "@components/search/search-field";
import SortingField from "@components/sorting/sort-field";
import { IProductData } from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import getFilteredAndSortedProducts from "@services/get-filtered-and-sorted";
import getProducts from "@services/get-products";

import searchProducts from "@services/search-products";

import { Container, Box, CircularProgress } from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [filterCriteria, setFilterCriteria] = useState<Record<string, string>>(
    {}
  );

  // fetching products with filters and/or sorting applied
  const fetchFilteredAndSortedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getFilteredAndSortedProducts(
        filterCriteria,
        sortingOption
      );
      setProducts(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // fetching the list of products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      setProducts(response.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // handle search and update products based on search query
  const searchHandler = async () => {
    setSortingOption("");

    if (searchQuery.trim() !== "") {
      try {
        setIsLoading(true);
        const searchResults = await searchProducts(searchQuery);
        setProducts(searchResults);
        setSearchError(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchError(true);
        setIsLoading(false);
      }
    } else {
      setProducts([]);
      setSearchError(false);
    }

    setSearchQuery("");
  };

  // handle fetching, filtering, sorting, and searching based on dependencies
  useEffect(() => {
    if (
      !sortingOption &&
      !searchQuery &&
      Object.keys(filterCriteria).length === 0
    ) {
      console.log("fetchProducts");
      fetchProducts();
    }

    if (searchQuery.trim() !== "" && !sortingOption) {
      setSortingOption("");
      searchHandler();
      console.log("searchHandler");
    }

    if (
      (sortingOption || Object.keys(filterCriteria).length > 0) &&
      !searchQuery
    ) {
      fetchFilteredAndSortedProducts();
      console.log("fetchFilteredAndSortedProducts");
    }
  }, [sortingOption, filterCriteria]);

  return (
    <>
      <AppHeader />
      <Container>
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHandler={searchHandler}
          isLoading={isLoading}
        />
        <SortingField
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
        />
        <FilterComponent onFilterChange={setFilterCriteria} />
        <Box className={styles.container}>
          {isLoading ? (
            <CircularProgress />
          ) : searchError ? (
            <p>Too short request</p>
          ) : !searchError && products.length === 0 ? (
            <p>No such product found. Try again</p>
          ) : (
            products.map((product: IProductData | IProductSearchResult) => (
              <CardComponent key={product.id} product={product} />
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
