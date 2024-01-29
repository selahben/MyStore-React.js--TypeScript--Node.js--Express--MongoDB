import { useStoreContext } from "../../context/store.context";
import { CategoryToEditType, CategoryType } from "../../utils/types";

export function CategoriesTableRow({ category }: { category: CategoryType }) {
  const { setCategoryToEdit, setModalFormType } = useStoreContext();

  //Opening the edit product modal
  function setEditCategory() {
    setModalFormType("editCategory");
    setCategoryToEdit(category as CategoryToEditType);
  }

  return (
    <tr>
      <td className="adminCategoryTD adminCategoryTitle">{category.title}</td>
      <td className="adminCategoryTD adminCategoryClassName">
        {category.className}
      </td>
      <td className="adminCategoryTD adminCategoryMain">
        {String(category.main)}
      </td>
      <td className="adminProductTD adminProductEdit text-center">
        <button
          className="btn editBTN btn-primary pb-0"
          onClick={setEditCategory}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
}
