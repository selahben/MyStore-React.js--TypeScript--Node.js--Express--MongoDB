import httpService from "./httpService";
import { AxiosRequestConfig } from "axios";

//Get Current User Cart
export async function fetchUserCart(token_header: AxiosRequestConfig) {
  let fetchedUserCart = await httpService
    .get(`/users/cart`, token_header)
    .then((response) => response.data);
  return fetchedUserCart.cart;
}

//Change Amount of product in user cart
export async function changeAmount(
  productId: string,
  newAmount: number,
  token_header: AxiosRequestConfig
) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": productId, "amount": newAmount },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}

//Delete product from cart
export async function deleteFromCart(
  productId: string,
  token_header: AxiosRequestConfig
) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": productId, "amount": 0 },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}

//Add product to cart
export async function addProductToCart(
  product_id: string,
  amount: number,
  token_header: AxiosRequestConfig
) {
  const cart = await httpService
    .patch(
      "/users/cart",
      { "product_id": product_id, "amount": amount },
      token_header
    )
    .then((response) => response.data);
  return cart.cart;
}
