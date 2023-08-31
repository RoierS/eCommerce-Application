import React from "react";

import { ISortingFieldProps } from "@interfaces/sort-field-props";

import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import styles from "./sortingField.module.scss";

const SortingField: React.FC<ISortingFieldProps> = ({
  sortingOption,
  setSortingOption,
}) => {
  return (
    <Box className={styles.sortingContainer}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-select-label">Sort by</InputLabel>
        <Select
          label="Sort by"
          value={sortingOption}
          onChange={(e) => setSortingOption(e.target.value)}
          displayEmpty
          className={styles.sortingSelect}
          variant="outlined"
          size="small"
        >
          <MenuItem value="name.en-Us asc">Name (A-Z)</MenuItem>
          <MenuItem value="name.en-Us desc">Name (Z-A)</MenuItem>
          <MenuItem value="price asc">Price (Low to High)</MenuItem>
          <MenuItem value="price desc">Price (High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingField;
