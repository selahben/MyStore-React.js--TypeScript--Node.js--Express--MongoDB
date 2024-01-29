import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";

import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "../services/productsServices";
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from "../services/categoriesServices";
import {
  changeIsAdmin,
  createUser,
  deleteUser,
  editUser,
  fetchCurrentUser,
  getAllUsers,
  loginUser,
  uploadUserAvatar,
} from "../services/usersServices";
import {
  fetchUserCart,
  addProductToCart,
  changeAmount,
  deleteFromCart,
} from "../services/cartServices";
import { errorHandling } from "../utils/errorHandling";
import {
  CategoryToEditType,
  CategoryType,
  CreateUserType,
  EditedUserType,
  FullUserCartProduct,
  FullUserType,
  LoginUserType,
  PartialFullUserType,
  ProductModelType,
  ProductType,
  SignedInUserType,
  UserCartProduct,
} from "../utils/types";
import { AxiosRequestConfig } from "axios";

const contextMustBeUsedError = () => {
  throw new Error(
    "You must use storeContext Provider for Consumer to work properly"
  );
};

const emptySignedInObj = {
  _id: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
  image: undefined,
  address: undefined,
  isAdmin: undefined,
};
const emptyProductObj = {
  _id: "",
  productName: "",
  productDescription: "",
  productPrice: 0,
  productUnit: "KG",
  productCategory: "",
  productImage: "",
  productSN: "",
  productVals: "",
  productIngredients: "",
  productTags: "",
};
const emptyProductModelObj = {
  _id: "",
  name: "",
  description: "",
  price: 0,
  unit: "",
  category: {
    title: "",
    className: "",
    main: false,
  },
  image: {
    url: "",
    alt: "",
  },
  sn: "",
  nutritionVals: "",
  ingredients: "",
  tags: "",
};
// const emptyCategoryObj = {
//   title: "",
//   className: "",
//   main: false,
// };

const emptyCategoryToEditObj = {
  _id: "",
  title: "",
  className: "",
  main: false,
};

const emptyUserObj = {
  _id: "",
  name: "",
  phone: "",
  email: "",
  password: "",
  image: {
    url: "",
    alt: "",
  },
  imageFile: "",
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
  isAdmin: false,
  cart: [],
};

type ContextType = {
  signedIn: SignedInUserType | null;
  userToEdit: FullUserType;
  setUserToEdit: React.Dispatch<React.SetStateAction<FullUserType>>;
  usersDataSort: {
    "sortBy": string;
    "sortOrder": string;
  };
  setUsersDataSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
  handleSignedIn: (user: CreateUserType | LoginUserType) => Promise<void>;
  handleSignOut: (reason?: string) => void;
  handleDeleteUser: (userId: string) => Promise<void>;
  users: FullUserType[];
  setUsers: React.Dispatch<React.SetStateAction<FullUserType[]>>;
  getUsers: () => void;
  changeUserAdminStatus: (userId: string, newStatus: boolean) => Promise<void>;
  tokenHeader: AxiosRequestConfig | null;
  cart: FullUserCartProduct[];
  handleAmountChange: (newAmount: number, _id: string) => Promise<void>;
  removeFromCart: (_id: string) => Promise<void>;
  addToCart: (product_id: string, amount: number) => Promise<void>;
  products: ProductModelType[];
  getProducts: () => void;
  productsFilter: string;
  setProductsFilter: React.Dispatch<React.SetStateAction<string>>;
  productsDataSort: {
    sortBy: string;
    sortOrder: string;
  };
  setProductsDataSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
  productToEdit: ProductModelType;
  setProductToEdit: React.Dispatch<React.SetStateAction<ProductModelType>>;
  setProductToQuickview: React.Dispatch<React.SetStateAction<ProductModelType>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleNewProduct: (newProduct: ProductType) => Promise<void>;
  handleEditProduct: (
    editedProduct: ProductType,
    productId: string
  ) => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
  handleEditUser: (userId: string, user: EditedUserType) => Promise<void>;
  productToQuickview: ProductModelType;
  searchQuery: string;
  categories: CategoryType[];
  handleNewCategory: (newCategory: CategoryType) => Promise<void>;
  categoryToEdit: CategoryToEditType;
  handleEditCategory: (
    editedCategory: CategoryType,
    categoryId: string
  ) => Promise<void>;
  handleDeleteCategory: (categoryId: string) => Promise<void>;
  setCategoryToEdit: React.Dispatch<React.SetStateAction<CategoryToEditType>>;
  catDataSort: {
    "sortBy": string;
    "sortOrder": string;
  };
  setCatDataSort: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
  modalFormType: string | null;
  setModalFormType: React.Dispatch<React.SetStateAction<string | null>>;
  modalFormError: string;
  setModalFormError: React.Dispatch<React.SetStateAction<string>>;
};

export const storeContext = createContext<ContextType>({
  signedIn: null,
  userToEdit: emptyUserObj,
  setUserToEdit: contextMustBeUsedError,
  usersDataSort: {
    "sortBy": "name",
    "sortOrder": "asc",
  },
  setUsersDataSort: contextMustBeUsedError,
  handleSignedIn: contextMustBeUsedError,
  handleSignOut: contextMustBeUsedError,
  handleDeleteUser: contextMustBeUsedError,
  users: [],
  setUsers: contextMustBeUsedError,
  getUsers: contextMustBeUsedError,
  changeUserAdminStatus: contextMustBeUsedError,
  tokenHeader: null,
  cart: [],
  handleAmountChange: contextMustBeUsedError,
  removeFromCart: contextMustBeUsedError,
  addToCart: contextMustBeUsedError,
  products: [],
  getProducts: contextMustBeUsedError,
  productsFilter: "AllProducts",
  setProductsFilter: contextMustBeUsedError,
  productsDataSort: {
    sortBy: "productName",
    sortOrder: "asc",
  },
  setProductsDataSort: contextMustBeUsedError,
  productToEdit: emptyProductModelObj,
  setProductToEdit: contextMustBeUsedError,
  setProductToQuickview: contextMustBeUsedError,
  setSearchQuery: contextMustBeUsedError,
  handleNewProduct: contextMustBeUsedError,
  handleEditProduct: contextMustBeUsedError,
  handleDeleteProduct: contextMustBeUsedError,
  handleEditUser: contextMustBeUsedError,
  productToQuickview: emptyProductModelObj,
  searchQuery: "",
  categories: [],
  handleNewCategory: contextMustBeUsedError,
  categoryToEdit: emptyCategoryToEditObj,
  handleEditCategory: contextMustBeUsedError,
  handleDeleteCategory: contextMustBeUsedError,
  setCategoryToEdit: contextMustBeUsedError,
  catDataSort: {
    "sortBy": "title",
    "sortOrder": "asc",
  },
  setCatDataSort: contextMustBeUsedError,
  modalFormType: null,
  setModalFormType: contextMustBeUsedError,
  modalFormError: "",
  setModalFormError: contextMustBeUsedError,
});
storeContext.displayName = "storeContext";

type StoreProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export function StoreProvider({ children }: StoreProviderProps) {
  //STATES//
  //Users
  const [signedIn, setSignedIn] = useState<SignedInUserType>(emptySignedInObj);
  const [userToEdit, setUserToEdit] = useState<FullUserType>(emptyUserObj);
  const [users, setUsers] = useState<FullUserType[]>([]);
  const [usersDataSort, setUsersDataSort] = useState({
    "sortBy": "name",
    "sortOrder": "asc",
  });

  //Cart
  const [cart, setCart] = useState([]);

  //Products
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState("AllProducts");
  const [productToEdit, setProductToEdit] =
    useState<ProductModelType>(emptyProductModelObj);
  const [productToQuickview, setProductToQuickview] =
    useState<ProductModelType>(emptyProductModelObj);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsDataSort, setProductsDataSort] = useState({
    "sortBy": "name",
    "sortOrder": "asc",
  });

  //Categories
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryToEditType>(
    emptyCategoryToEditObj
  );
  const [catDataSort, setCatDataSort] = useState({
    "sortBy": "title",
    "sortOrder": "asc",
  });

  //Modal
  const [modalFormType, setModalFormType] = useState<string | null>(null);
  const [modalFormError, setModalFormError] = useState("");

  //Current User Token Header
  const [tokenHeader, setTokenHeader] = useState(
    localStorage.getItem("storeCurrentUser")
      ? {
          headers: { "x-auth-token": localStorage.getItem("storeCurrentUser") },
        }
      : {}
  );

  //FUNCTIONS//
  //Init Functions
  //Get Products - Init and general use
  useEffect(() => {
    getProducts();
  }, [productsFilter, searchQuery, productsDataSort]);
  //Get Products Function
  async function getProducts() {
    let productsQuery = "";
    if (
      productsFilter !== "AllProducts" ||
      searchQuery !== "" ||
      Object.keys(productsDataSort).length !== 0
    ) {
      productsQuery += "?";
    }
    if (productsFilter !== "AllProducts") {
      productsQuery += `cat=${productsFilter}`;
    }
    if (productsFilter !== "AllProducts" || searchQuery !== "") {
      productsQuery += "&";
    }
    if (searchQuery !== "") {
      productsQuery += `search=${searchQuery}`;
    }
    if (productsFilter !== "AllProducts" || searchQuery !== "") {
      productsQuery += "&";
    }
    if (Object.keys(productsDataSort).length !== 0) {
      productsQuery += `sortBy=${productsDataSort.sortBy}&sortOrder=${productsDataSort.sortOrder}`;
    }
    try {
      const filteredProducts = await fetchProducts(productsQuery);
      setProducts(filteredProducts);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
      return;
    }
  }

  //Get Categories - Init and general use
  useEffect(() => {
    getCategories();
  }, [catDataSort]);
  //Get Categories Function
  async function getCategories() {
    let categoriesQuery = "";

    if (Object.keys(catDataSort).length !== 0) {
      categoriesQuery += `?sortBy=${catDataSort.sortBy}&sortOrder=${catDataSort.sortOrder}`;
    }
    try {
      const filteredCategories = await fetchCategories(categoriesQuery);
      setCategories(filteredCategories);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
      return;
    }
  }

  //Get Saved User - Init and general use
  useEffect(() => {
    if (Object.keys(tokenHeader).length !== 0) {
      getCurrentUser();
    }
  }, []);
  //Get Current User function
  async function getCurrentUser() {
    try {
      const fetchedUser = await fetchCurrentUser({
        headers: { "x-auth-token": localStorage.getItem("storeCurrentUser") },
      });
      setModalFormError("");
      setModalFormType(null);
      setSignedIn({
        _id: fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email,
        phone: fetchedUser.phone,
        image: fetchedUser.image,
        address: fetchedUser.address,
        isAdmin: fetchedUser.isAdmin,
      });
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
      handleSignOut();
      setSignedIn(emptySignedInObj);
      return;
    }
  }

  //Get and Set User Cart  - Init and general use
  useEffect(() => {
    if (Object.keys(signedIn).length !== 0 && signedIn.email !== undefined) {
      getAndSetUserCart();
    }
  }, [signedIn, products]);
  //Get Cart Function
  async function getAndSetUserCart() {
    try {
      let fetchedUserCart = await fetchUserCart(tokenHeader);
      setCart(fetchedUserCart);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
    }
  }

  //Reset Modal Error when changing Modal Form Type
  useEffect(() => {
    setModalFormError("");
    if (modalFormType !== "editProduct") {
      setProductToEdit(emptyProductModelObj);
    }
  }, [modalFormType]);

  //User Functions
  //--------------
  //Handles Sign In/Up (user)
  async function handleSignedIn(user: CreateUserType | LoginUserType) {
    if (modalFormType === "signUp") {
      try {
        await createUser(user);
      } catch (err) {
        const message = errorHandling(err);
        setModalFormError(message);
        return;
      }
    }
    try {
      const token = await loginUser(user);
      localStorage.setItem("storeCurrentUser", token);
      setTokenHeader({ headers: { "x-auth-token": token } });
      await getCurrentUser();
      toast.success("You Registered / Logged In Successfully.");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
      return;
    }
  }

  //Handle Sign Out (user)
  function handleSignOut(reason = "") {
    localStorage.removeItem("storeCurrentUser");
    setTokenHeader({});
    setSignedIn(emptySignedInObj);
    setCart([]);
    setUsers([]);
    toast.warn(`You Are Signed Out${reason}..`);
  }

  //Handle Edit User (user & admin)
  async function handleEditUser(userId: string, user: EditedUserType) {
    const editedUser: PartialFullUserType = {
      name: user.editedName,
      email: user.editedEmail,
      phone: user.editedPhone,
      image: {
        url: user.editedImageUrl,
        alt: user.editedImageAlt,
      },
      address: {
        state: user.editedAddressState,
        country: user.editedAddressCountry,
        city: user.editedAddressCity,
        street: user.editedAddressStreet,
        houseNumber: user.editedAddressHouseNum,
        zip: user.editedAddressZip,
      },
    };
    if (user.editedPass) {
      editedUser["password"] = user.editedPass;
    }
    try {
      await editUser(userId, editedUser, tokenHeader);
      await uploadUserAvatar(userId, user.editedImageFile, {
        headers: {
          "x-auth-token": localStorage.getItem("storeCurrentUser"),
          "Content-Type": "multipart/form-data",
        },
      });
      await getCurrentUser();
      if (signedIn.isAdmin) {
        await getUsers();
      }
      setModalFormError("");
      setModalFormType("");
      toast.success("Your Profile was Updated successfully!");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Handle Delete User (user & admin)
  async function handleDeleteUser(userId: string) {
    try {
      const deletedUser = await deleteUser(userId, tokenHeader);
      setModalFormError("");
      setModalFormType("");
      toast.warn("The User was Deleted from the system..");
      if (deletedUser._id === signedIn._id) {
        handleSignOut();
      }
      if (signedIn.isAdmin) {
        getUsers();
      }
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Get All Users (admin)
  useEffect(() => {
    if (signedIn?.isAdmin) {
      getUsers();
    }
  }, [usersDataSort]);
  //Get Users Function
  async function getUsers() {
    let usersQuery = "";

    if (Object.keys(usersDataSort).length !== 0) {
      usersQuery += `?sortBy=${usersDataSort.sortBy}&sortOrder=${usersDataSort.sortOrder}`;
    }
    try {
      const allUsers = await getAllUsers(usersQuery, tokenHeader);
      setUsers(allUsers);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
    }
  }

  //Change User Admin Status
  async function changeUserAdminStatus(userId: string, newStatus: boolean) {
    if (signedIn._id !== userId) {
      try {
        await changeIsAdmin(userId, newStatus, tokenHeader);
        await getCurrentUser();
      } catch (err) {
        const message = errorHandling(err);
        toast.error(message);
      }
    } else {
      toast.error("You can't change your own status..");
    }
  }

  //Cart Functions
  //--------------
  //Cart: Handle amount change
  async function handleAmountChange(newAmount: number, _id: string) {
    try {
      const cart = await changeAmount(_id, newAmount, tokenHeader);
      setCart(cart);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
    }
  }

  //Cart: Handle remove from cart
  async function removeFromCart(_id: string) {
    try {
      const cart = await deleteFromCart(_id, tokenHeader);
      setCart(cart);
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
    }
  }

  //Cart: Add to cart
  async function addToCart(product_id: string, amount: number) {
    try {
      const cart = await addProductToCart(product_id, amount, tokenHeader);
      setCart(cart);
    } catch (err) {
      const message = errorHandling(err);
      console.log(message);
    }
  }

  //Product Functions
  //---------------------------------
  //Product: Add
  async function handleNewProduct(newProduct: ProductType) {
    try {
      await addProduct(newProduct, tokenHeader);
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
      toast.success("The Product was successfully Added!");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Product: Edit
  async function handleEditProduct(
    editedProduct: ProductType,
    productId: string
  ) {
    try {
      await editProduct(productId, editedProduct, tokenHeader);
      toast.success("Product was updated successfully!");
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Product: Delete
  async function handleDeleteProduct(productId: string) {
    try {
      await removeFromCart(productId);
      await deleteProduct(productId, tokenHeader);
      await getProducts();
      setModalFormType(null);
      setModalFormError("");
      toast.warn("The Product was successfully Deleted..");
    } catch (err) {
      const message = errorHandling(err);
      toast.error(message);
    }
  }

  //Category Functions
  //------------------
  //Category: Add
  async function handleNewCategory(newCategory: CategoryType) {
    try {
      await addCategory(newCategory, tokenHeader);
      getCategories();
      setModalFormType(null);
      setModalFormError("");
      toast.success("The Category was successfully Added!");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Category: Edit
  async function handleEditCategory(
    editedCategory: CategoryType,
    categoryId: string
  ) {
    try {
      await editCategory(categoryId, editedCategory, tokenHeader);
      toast.success("Category was updated successfully!");
      getProducts();
      getCategories();
      setModalFormType(null);
      setModalFormError("");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  //Category: Delete
  async function handleDeleteCategory(categoryId: string) {
    try {
      await deleteCategory(categoryId, tokenHeader);
      getProducts();
      getCategories();
      setModalFormType(null);
      setModalFormError("");
      toast.warn("The Category was successfully Deleted..");
    } catch (err) {
      const message = errorHandling(err);
      setModalFormError(message);
    }
  }

  return (
    <storeContext.Provider
      value={{
        signedIn,
        userToEdit,
        setUserToEdit,
        usersDataSort,
        setUsersDataSort,
        users,
        getUsers,
        handleSignedIn,
        handleSignOut,
        handleEditUser,
        handleDeleteUser,
        changeUserAdminStatus,
        setUsers,
        tokenHeader,

        cart,
        handleAmountChange,
        removeFromCart,
        addToCart,

        getProducts,
        products,
        productToEdit,
        setProductToEdit,
        productsDataSort,
        setProductsDataSort,
        productsFilter,
        setProductsFilter,
        handleNewProduct,
        handleEditProduct,
        handleDeleteProduct,
        productToQuickview,
        setProductToQuickview,
        searchQuery,
        setSearchQuery,

        categories,
        catDataSort,
        setCatDataSort,
        categoryToEdit,
        setCategoryToEdit,
        handleNewCategory,
        handleEditCategory,
        handleDeleteCategory,

        modalFormType,
        setModalFormType,
        modalFormError,
        setModalFormError,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(storeContext);
};
