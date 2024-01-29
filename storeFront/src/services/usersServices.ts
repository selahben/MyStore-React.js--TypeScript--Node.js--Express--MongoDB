import { AxiosRequestConfig } from "axios";
import httpService from "./httpService";
import {
  CreateUserType,
  FullUserType,
  LoginUserType,
  PartialFullUserType,
} from "../utils/types";

//Get Current User
export async function fetchCurrentUser(token_header: AxiosRequestConfig) {
  let fetchedUser = await httpService
    .get(`/users/me`, token_header)
    .then((response) => response.data);
  return fetchedUser;
}

//Create User / Sign Up
export async function createUser(user: CreateUserType) {
  await httpService
    .post("/users", {
      "name": user.name,
      "email": user.email,
      "password": user.password,
    })
    .then((response) => response.data);
}

//User Login
export async function loginUser(user: LoginUserType) {
  const token = await httpService
    .post("/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => response.data.token);
  return token;
}

//Edit User
export async function editUser(
  userId: string,
  editedUser: PartialFullUserType,
  token_header: AxiosRequestConfig
) {
  await httpService
    .put(`/users/${userId}`, editedUser, token_header)
    .then((response) => response.data);
}

//Edit User - Upload Avatar Image
export async function uploadUserAvatar(
  userId: string,
  avatar: string,
  headers: AxiosRequestConfig
) {
  await httpService
    .put(`/users/upload/${userId}`, { "avatar": avatar }, headers)
    .then((response) => response.data);
}

//Delete User
export async function deleteUser(
  userId: string,
  token_header: AxiosRequestConfig
) {
  const deletedUser = await httpService
    .delete(`/users/${userId}`, token_header)
    .then((response) => response.data);
  return deletedUser;
}

//Get All Users (Admin)
export async function getAllUsers(
  usersQuery: string,
  token_header: AxiosRequestConfig
) {
  const allUsers = await httpService
    .get(`/users${usersQuery}`, token_header)
    .then((response) => response.data);
  return allUsers;
}

//Change isAdmin Status (Admin)
export async function changeIsAdmin(
  userId: string,
  newStatus: boolean,
  token_header: AxiosRequestConfig
) {
  await httpService.patch(
    `/users/isAdmin/${userId}`,
    { "isAdmin": newStatus },
    token_header
  );
}

//Forgot Password
export async function forgotPass(email: string) {
  await httpService.post("/users/forgot-password", {
    "email": email,
  });
}

//Reset Password
export async function resetPass(
  newPassword: string,
  token: string | undefined
) {
  await httpService.post(
    "/users/reset-password",
    { "password": newPassword },
    { headers: { "x-auth-token": token } }
  );
}
