import React from "react";
import { Input } from "../common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi"; // Import JoiErrorsType
import { useStoreContext } from "../../context/store.context";

interface CategoryFormValues {
  catTitle: string;
  catClassName: string;
}

export function CategoryForm() {
  const {
    modalFormType,
    categoryToEdit,
    handleNewCategory,
    handleEditCategory,
    handleDeleteCategory,
  } = useStoreContext();

  function handleCategory(values: CategoryFormValues) {
    const category = {
      title: values.catTitle,
      className: values.catClassName,
    };
    if (modalFormType === "newCategory") {
      handleNewCategory(category);
    } else if (modalFormType === "editCategory") {
      handleEditCategory(category, categoryToEdit._id);
    }
  }

  const form = useFormik<CategoryFormValues>({
    validateOnMount: false,
    initialValues: {
      catTitle: modalFormType === "editCategory" ? categoryToEdit.title : "",
      catClassName:
        modalFormType === "editCategory" ? categoryToEdit.className : "",
    },
    validate: formikValidateUsingJoi({
      catTitle: Joi.string()
        .pattern(/^[A-Za-z][A-Za-z ]*$/)
        .min(2)
        .max(255)
        .required()
        .label("Category Title")
        .messages({
          "string.pattern.base":
            "Category Title can contain only letters and spaces..",
        }),
      catClassName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(255)
        .required()
        .label("Category Class Name")
        .messages({
          "string.pattern.base":
            "Category Classname can contain only letters..",
        }),
    }),
    onSubmit: handleCategory,
  });

  return (
    <form noValidate>
      <Input
        {...form.getFieldProps("catTitle")}
        label="Category Title"
        type="text"
        placeholder={categoryToEdit ? categoryToEdit.title : ""}
        required
        error={form.touched.catTitle && form.errors.catTitle}
        id="catTitle"
      />
      <Input
        {...form.getFieldProps("catClassName")}
        label="Category Class Name"
        type="text"
        placeholder={categoryToEdit ? categoryToEdit.className : ""}
        required
        error={form.touched.catClassName && form.errors.catClassName}
        id="catClassName"
      />
      <p id="categoryFormBtnP">
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="categoryFormBTN btn"
          name="categorySubmit"
          id="categorySubmit"
          type="button"
          disabled={true && !form.isValid}
        >
          {modalFormType === "newCategory"
            ? "Add your Category"
            : "Submit Changes"}
        </button>
        {modalFormType === "editCategory" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCategory(categoryToEdit._id);
            }}
            type="button"
            id="categoryDelete"
            className="categoryDeleteBTN btn"
          >
            Delete Category
          </button>
        )}
      </p>
    </form>
  );
}
