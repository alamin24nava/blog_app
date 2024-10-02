import CreateCategory from "../components/CreateCategory";
import CreateAuthor from "../components/CreateAuthor";
import DataTable from "../components/DataTable";
import GlobalLoading from "../components/GlobalLoading";
import DelayedSearch from "../components/DelayedSearch"
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  categoriesGetuseSelector,
  deleteCategories,
  updateCategories,
  EDITABLE_CATEGORY,
} from "../features/categories/categoriesSlice";
import {
  getAuthors,
  authorsGetuseSelector,
} from "../features/authors/authorsSlice";
import { useEffect, useState } from "react";
const Home = () => {
  const [categoryName, setCategoryName] = useState("");
  const { categoryList, editableCategory } = useSelector(
    categoriesGetuseSelector
  );
  const { authorList } = useSelector(authorsGetuseSelector);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteCategories(id));
  };
  const handleEdit = (category) => {
    setCategoryName(editableCategory?.name);
    dispatch(EDITABLE_CATEGORY(category));
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, [dispatch]);

  useEffect(() => {
    editableCategory;
  }, [editableCategory]);
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="border p-6 rounded-md w-full">
            <CreateCategory
              _onEditableCategory={editableCategory}
              _onCategoryName={categoryName}
              _onSetCategoryName={setCategoryName}
            />
          </div>
          <div className="border p-6 rounded-md w-full">
            <DelayedSearch/>  
            <DataTable
              _onHandleEdit={handleEdit}
              _onHandleDelete={handleDelete}
              _onTitle="Category Name"
              _onDataLists={categoryList}
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="border p-6 rounded-md w-full">
            <CreateAuthor />
          </div>
          <div className="border p-6 rounded-md w-full">
            <DataTable _onTitle="Author Name" _onDataLists={authorList} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
