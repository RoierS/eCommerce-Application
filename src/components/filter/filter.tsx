import React, { useState } from "react";

import { IFilterComponentProps } from "@interfaces/filter-props";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Slider,
  Box,
} from "@mui/material";

import styles from "./filter.module.scss";

const FilterComponent: React.FC<IFilterComponentProps> = ({
  onFilterChange,
}) => {
  const [countryFilter, setCountryFilter] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 300000]);

  // apply filters by country and price range
  const handleApplyFilters = () => {
    const newFilterCriteria: Record<string, string> = {};

    if (countryFilter !== "All") {
      newFilterCriteria["variants.attributes.country"] = `"${countryFilter}"`;
    }
    if (!countryFilter) {
      delete newFilterCriteria["variants.attributes.country"];
    }

    const [minPrice, maxPrice] = priceRange;
    newFilterCriteria[
      "variants.price.centAmount"
    ] = `range(${minPrice} to ${maxPrice})`;

    onFilterChange(newFilterCriteria);
  };

  // clears the filters
  const handleClearFilters = () => {
    setCountryFilter("");
    setPriceRange([0, 300000]);
    onFilterChange({});
  };

  return (
    <Box className={styles.filterContainer}>
      <FormControl fullWidth size="small">
        <InputLabel id="filter-select-label">Country</InputLabel>
        <Select
          className={styles.select}
          sx={{ mb: 5 }}
          labelId="filter-select-label"
          value={countryFilter}
          onChange={(event) => setCountryFilter(event.target.value)}
          label="Country"
          variant="outlined"
          size="small"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Spain">Spain</MenuItem>
          <MenuItem value="Poland">Poland</MenuItem>
          <MenuItem value="Egypt">Egypt</MenuItem>
        </Select>
        <Slider
          sx={{ width: 1 / 2, alignSelf: "center" }}
          className={styles.slider}
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="on"
          marks={[
            { value: 0, label: "0$" },
            { value: 300000, label: "3000$" },
          ]}
          aria-labelledby="range-slider"
          min={0}
          max={300000}
          valueLabelFormat={(value) => `${(value / 100).toFixed()}$`}
        />
      </FormControl>
      <Box className={styles.buttonsContainer}>
        <Button onClick={handleApplyFilters} variant="outlined" color="success">
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outlined" color="error">
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
