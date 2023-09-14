/* eslint-disable no-console */
import axios from "axios";

// const apiHost = process.env.REACT_APP_API_HOST;
const projectKey = process.env.REACT_APP_PROJECT_KEY;

const createCart = async (accessToken: string) => {
  try {
    const newCartResponse = await axios.post(
      `https://api.commercetools.com/${projectKey}/me/carts`,
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

    console.log("New cart created");
    return newCartResponse.data.id;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

const getCart = async (accessToken: string) => {
  try {
    const activeCartResponse = await axios.get(
      `https://api.commercetools.com/${projectKey}/me/active-cart`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Active cart exists");
    return activeCartResponse.data.id;
  } catch (error) {
    const newCart = await createCart(accessToken);
    localStorage.setItem("anonymCardID", newCart);
    return newCart;
  }
};

const addProductToCart = async (
  // cartId: string,
  productId: string,
  accessToken: string
) => {
  try {
    const cartResponse = await axios.get(
      `https://api.commercetools.com/${projectKey}/me/active-cart`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const currentCartVersion = cartResponse.data.version;
    const currentCartId = cartResponse.data.id;

    const addToCartResponse = await axios.post(
      `https://api.commercetools.com/${projectKey}/me/carts/${currentCartId}`,
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
