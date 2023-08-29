import React from "react";

import AppHeader from "@components/header/header";
import products from "@pages/products/mock-catalog-list";
import { Link } from "react-router-dom";

import { List, ListItem } from "@mui/material";

const Catalog = () => {
  return (
    <>
      <AppHeader />
      <List>
        {Object.keys(products).map((key) => (
          <ListItem key={key}>
            <Link to={`${products[key].link}${products[key].id}`}>
              {`test${products[key].index} ${key}`}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default Catalog;
