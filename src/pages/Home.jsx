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
  postAuthors,
  updateAuthors,
} from "../features/authors/authorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlobalLoading from "../components/GlobalLoading";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";

const Home = () => {
  const { categoryList, isLoading, isError } = useSelector(
    categoriesGetuseSelector
  );
  const { authorList } = useSelector(authorsGetuseSelector);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("--Select--");
  const [selectedId, setSelectedId] = useState(null);
  const [editableItem, setEditableItem] = useState(null);
  const [onchangeValues, setOnchangeValues] = useState({
    categoryName: "",
    authorName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOnchangeValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategories(id));
    setOnchangeValues({categoryName: ""})
    setEditableItem(null)
  };
  const handleDeleteAuthor = (id) => {
    dispatch(deleteAuthors(id));
    setOnchangeValues({authorName: ""})
    setSelected('-- Select --')
    setEditableItem(null)
  };

  const handleEditCategory = (category) => {
    setOnchangeValues({ categoryName: category.name });
    setEditableItem(category);
  };
  const handleEditAuthor = (author) => {
    setOnchangeValues({ authorName: author.name });
    setEditableItem(author);
    const findedCategory = categoryList?.find((findId)=> findId?.id == author?.category_id)
    setSelected(findedCategory?.name)
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, [setOnchangeValues]);

  const handleSubmit = (e, action) => {
    e.preventDefault();

    if (action == "categoryForm") {
      if (onchangeValues.categoryName.trim() == "") {
        return toast.error("Please Provide Something!");
    }
      const isDuplicate = categoryList.find(
        (item) => item.name === onchangeValues.categoryName
      );
      if (isDuplicate) {
        return toast.error("Already Added This Category");
      }
      const newCategory = { name: onchangeValues.categoryName };
      if (editableItem == null) {
        dispatch(postCategories(newCategory));
        toast.success("Successfully created!");
      } else {
        const updateCategory = {
          id: editableItem.id,
          name: onchangeValues.categoryName,
        };

        dispatch(updateCategories(updateCategory));
        toast.success("Successfully Updated!");
        setEditableItem(null);
      }
    } else if (action == "authorForm") {
      if (onchangeValues.authorName == "") {
        return toast.error("Please Provide Something!");
    }
      const isDuplicate = authorList.find(
        (item) => item.name === onchangeValues.authorName
      );
      if (isDuplicate) {
        setOnchangeValues({authorName: ""})
        setSelected("--Select--")
        return toast.error("Already Added This Author");
      }
      const newAuthor = { name: onchangeValues.authorName , category_id:selectedId};

      if (editableItem === null) {
        if(selected == "--Select--"){
          return toast.error("Please Select Category");
        }
        dispatch(postAuthors(newAuthor));
        toast.success("Successfully created!");
      } else {
        const updateAuthor = {
          id: editableItem.id,
          name: onchangeValues.authorName,
          category_id:1
        };

        dispatch(updateAuthors(updateAuthor));
        toast.success("Successfully Updated!");
      }
    }
    setOnchangeValues({
      categoryName: "",
      authorName: "",
    })
    setSelected("--Select--")
    setEditableItem(null)
  };
  return (
    <>
      {isLoading && !isError ? (
        <GlobalLoading />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="border p-6 rounded-md w-full">
              <form
                onSubmit={(e) => handleSubmit(e, "categoryForm")}
                className="flex gap-6"
              >
                <Input
                  _onHandleChange={handleChange}
                  _onchangeValue={onchangeValues.categoryName}
                  name="categoryName"
                  placeholder="Category Name"
                />
                <button className="btn btn-primary">{editableItem === null ? "Create Category" : "Updated Category"}</button>
              </form>
            </div>
            <div className="border p-6 rounded-md w-full">
              <DataTable
                _onHandleEdit={handleEditCategory}
                _onHandleDelete={handleDeleteCategory}
                _dataLists={categoryList}
                _title="Categories List"
                _th2="Category Name"
                _th3=""
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="border p-6 rounded-md w-full">
              <form
                onSubmit={(e) => handleSubmit(e, "authorForm")}
                className="flex gap-6"
              >
                <DropDownMenu
                  _dropDownItems={categoryList}
                  _selected={selected}
                  _setSelected={setSelected}
                  _setSelectedId={setSelectedId}
                />
                <Input
                  _onHandleChange={handleChange}
                  _onchangeValue={onchangeValues.authorName}
                  name="authorName"
                  placeholder="Author Name"
                />
                <button className="btn btn-primary">{editableItem === null ? "Create Author" : "Updated Author"}</button>
              </form>
            </div>
            <div className="border p-6 rounded-md w-full">
              <DataTable
                _onHandleDelete={handleDeleteAuthor}
                _onHandleEdit={handleEditAuthor}
                _dataLists={authorList}
                _categoryList = {categoryList}
                _title="Authors List"
                _th2="Author Name"
                _th3="Category Name"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
