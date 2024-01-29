import { CategoryType } from "../utils/types";
import httpService from "./httpService";
import { AxiosRequestConfig } from "axios";

//Get All Categories
export async function fetchCategories(categoriesQuery: string) {
  const categories = await httpService
    .get(`/categories${categoriesQuery}`)
    .then((response) => response.data);
  return categories;
}

//Add Category
export async function addCategory(
  newCategory: CategoryType,
  token_header: AxiosRequestConfig
) {
  await httpService
    .post("/categories", newCategory, token_header)
    .then((response) => response.data);
  return;
}

//Edit Category
export async function editCategory(
  categoryId: string,
  editedCategory: CategoryType,
  token_header: AxiosRequestConfig
) {
  await httpService
    .put(`/categories/${categoryId}`, editedCategory, token_header)
    .then((response) => response.data);
  return;
}

//Delete Category
export async function deleteCategory(
  categoryId: string,
  token_header: AxiosRequestConfig
) {
  await httpService
    .delete(`/categories/${categoryId}`, token_header)
    .then((response) => response.data);
  return;
}
