/* eslint-disable no-console */
import axios from "axios";

const apiHost = process.env.REACT_APP_API_HOST;
const projectKey = process.env.REACT_APP_PROJECT_KEY;

// create new cart
const createCart = async (accessToken: string) => {
  try {
    const newCartResponse = await axios.post(
      `${apiHost}/${projectKey}/me/carts`,
      {
        currency: "USD",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("New cart created", newCartResponse.data);
    return newCartResponse.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

// get existing cart (if not exist, creates new one)
const getCart = async (accessToken: string) => {
  try {
    const activeCartResponse = await axios.get(
      `${apiHost}/${projectKey}/me/active-cart`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Active cart exists", activeCartResponse.data);
    return activeCartResponse.data;
  } catch (error) {
    const newCart = await createCart(accessToken);
    localStorage.setItem("anonymCardID", newCart.id);
    console.log("New cart created", newCart);
    return newCart;
  }
};

// add product to cart
const addProductToCart = async (
  currentCartId: string,
  currentCartVersion: number,
  productId: string,
  accessToken: string
) => {
  try {
    const addToCartResponse = await axios.post(
      `${apiHost}/${projectKey}/me/carts/${currentCartId}`,
      {
        version: currentCartVersion,
        actions: [
          {
            action: "addLineItem",
            productId,
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Product added to active cart:", addToCartResponse.data);
    return addToCartResponse.data;
  } catch (error) {
    console.error("Error adding product to active cart:", error);
    throw error;
  }
};

export { getCart, createCart, addProductToCart };
