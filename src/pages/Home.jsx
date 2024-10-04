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
} from "../features/authors/authorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlobalLoading from "../components/GlobalLoading";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";

const Home = () => {
    const { categoryList, isLoading, isError } = useSelector(categoriesGetuseSelector);
    const { authorList } = useSelector(authorsGetuseSelector);
    const dispatch = useDispatch();

    const [editableItem, setEditableItem] = useState(null);
    const [onchangeValues, setOnchangeValues] = useState({
        categoryName: '',
        authorName:''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setOnchangeValues((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategories(id));
    };
    const handleDeleteAuthor = (id) => {
        dispatch(deleteAuthors(id));
    };

    const handleEditCategory = (category) => {
        setOnchangeValues({categoryName:category.name});
        setEditableItem(category);
        console.log(category)
    };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, [setOnchangeValues]);

const handleSubmit = (e, action) => {
    e.preventDefault();
    // if (onchangeValues.categoryName.trim() || onchangeValues.authorName.trim() === "") {
    //     return toast.error("Please Provide Something!");
    // }
    if(action == "categoryForm"){
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
    }else if(action == "authorForm"){
        const isDuplicate = authorList.find(
            (item) => item.name === onchangeValues.authorName
        );
        if (isDuplicate) {
            return toast.error("Already Added This Author");
        }
        const newAuthor = { name: onchangeValues.authorName };

        dispatch(postAuthors(newAuthor));
        toast.success("Successfully created!");
        // if (editableItem == null) {
        //     dispatch(postAuthors(newAuthor));
        //     toast.success("Successfully created!");
        // } else {
        //   const updateCategory = {
        //     id: editableItem.id,
        //     name: onchangeValues.authorName,
        //   };
    
        //   dispatch(updateCategories(updateCategory));
        //   toast.success("Successfully Updated!");
        //   setEditableItem(null);
        // }
    }
    setOnchangeValues({});

  };
  
  return (
    <>
      {isLoading && !isError ? (
        <GlobalLoading />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="border p-6 rounded-md w-full">
              <form onSubmit={(e)=>handleSubmit(e, "categoryForm")} className="flex gap-6">
                <Input 
                _onHandleChange = {handleChange}
                _onchangeValue={onchangeValues.categoryName}
                name ="categoryName"
                placeholder="Category Name"
                />
                <button className="btn btn-primary">Create Category</button>
              </form>
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
              <form onSubmit={(e)=>handleSubmit(e, "authorForm")} className="flex gap-6">
                {/* <DropDownMenu _dropDownItems={categoryList}/> */}
                <Input 
                _onHandleChange = {handleChange}
                _onchangeValue={onchangeValues.authorName}
                name ="authorName"
                placeholder="Author Name"
                />
                <button className="btn btn-primary">Create Author</button>
              </form>
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
