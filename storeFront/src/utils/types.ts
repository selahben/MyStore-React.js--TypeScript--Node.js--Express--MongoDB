export type ProductType = {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productUnit: "KG" | "Units" | string;
  productCategory: string;
  productImage: string;
  productSN: string;
  productVals: string;
  productIngredients: string;
  productTags: string;
};
export type ProductModelType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: CategoryType;
  image: {
    url: string;
    alt: string;
  };
  sn: string;
  nutritionVals: string;
  ingredients: string;
  tags: string;
};
export type CategoryType = {
  className: string;
  title: string;
  main?: boolean;
};

export type CategoryToEditType = {
  _id: string;
  title: string;
  className: string;
  main?: boolean;
};

export type CreateUserType = {
  name?: string;
  email: string;
  password: string;
};
export type LoginUserType = {
  email: string;
  password: string;
};

export type FullUserType = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  image: {
    url: string;
    alt: string;
  };
  imageFile?: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  isAdmin?: boolean;
  cart?: UserCartProduct[];
};

export type EditedUserType = {
  editedName: string;
  editedPhone: string;
  editedEmail: string;
  editedPass: string;
  editedImageUrl: string;
  editedImageAlt: string;
  imageFile?: string;
  editedAddressState: string;
  editedAddressCountry: string;
  editedAddressCity: string;
  editedAddressStreet: string;
  editedAddressHouseNum: string;
  editedAddressZip: string;
  editedImageFile: string;
};

export type PartialFullUserType = {
  name: string;
  phone: string;
  email: string;
  password?: string;
  image: {
    url: string;
    alt: string;
  };
  imageFile?: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  isAdmin?: boolean;
  cart?: UserCartProduct[];
};

export type SignedInUserType = {
  _id: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  image:
    | {
        url: string | undefined;
        alt: string | undefined;
      }
    | undefined;
  address:
    | {
        state: string | undefined;
        country: string | undefined;
        city: string | undefined;
        street: string | undefined;
        houseNumber: string | undefined;
        zip: string | undefined;
      }
    | undefined;
  isAdmin: boolean | undefined;
};

export type UserCartProduct = {
  product: string;
  amount: number;
};

export type FullUserCartProduct = {
  product: ProductModelType;
  amount: number;
};

export type JoiErrorsType = {
  [index: string]: string;
};
