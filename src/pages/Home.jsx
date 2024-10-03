import CreateCategory from "../components/CreateCategory";
import DelayedSearch from "../components/DelayedSearch";
import DataTable from "../components/DataTable";
import CreateAuthor from "../components/CreateAuthor";
import {
  getCategories,
  categoriesGetuseSelector,
  deleteCategories,
  updateCategories,
  postCategories,
} from "../features/categories/categoriesSlice";
import {
  authorsGetuseSelector,
  getAuthors,
  deleteAuthors,
} from "../features/authors/authorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlobalLoading from "../components/GlobalLoading";

const Home = () => {
  const [editableCategory, setEditableCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { categoryList, isLoading, isError } = useSelector(
    categoriesGetuseSelector
  );

  const { authorList } = useSelector(authorsGetuseSelector);
  const dispatch = useDispatch();

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategories(id));
    setCategoryName("");
  };
  const handleDeleteAuthor = (id) => {
    dispatch(deleteAuthors(id));
  };
  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditableCategory(category);
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() == "") {
      return toast.error("Please Provide Something!");
    }
    const newCategory = {
      name: categoryName,
    };
    if (editableCategory == null) {
      dispatch(postCategories(newCategory));
      toast.success("Successfully created!");
    } else {
      const updateCategory = {
        id: editableCategory.id,
        name: categoryName,
      };
      dispatch(updateCategories(updateCategory));
      toast.success("Successfully Updated!");
      setEditableCategory(null);
    }
    setCategoryName("");
  };

  return (
    <>
      {isLoading && !isError ? (
        <GlobalLoading />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="border p-6 rounded-md w-full">
              <CreateCategory
                _setInputValue={setCategoryName}
                _inputValue={categoryName}
                _onHandleSubmit={handleSubmit}
                _editableCategory={editableCategory}
              />
            </div>
            <div className="border p-6 rounded-md w-full">
              <DataTable
                _onHandleEdit={handleEditCategory}
                _onHandleDelete={handleDeleteCategory}
                _dataLists={categoryList}
                _title="Categories List"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="border p-6 rounded-md w-full">
              <CreateAuthor/>
            </div>
            <div className="border p-6 rounded-md w-full">
              <DataTable
                _onHandleDelete={handleDeleteAuthor}
                _dataLists={authorList}
                _title="Authors List"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
