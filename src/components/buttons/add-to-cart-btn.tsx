import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

interface AddToCartButtonProps {
  isInCart: boolean;
  handleAddToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isInCart,
  handleAddToCart,
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      color={isInCart ? "secondary" : "success"}
      onClick={handleAddToCart}
      startIcon={<ShoppingCartIcon />}
      disabled={isInCart}
    >
      {isInCart ? "Added" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
