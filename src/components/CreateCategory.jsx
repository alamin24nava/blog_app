import { useEffect, useState } from "react";
import { postCategories ,updateCategories} from "../features/categories/categoriesSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateCategory = ({
  _onEditableCategory,
  _onCategoryName,
  _onSetCategoryName,
}) => {



  const dispatch = useDispatch();
  // const [categoryName, setCategoryName] = useState('')
  // console.log(editableCategory)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (_onCategoryName.trim() == "") {
      return toast.error("Please Provide Something!");
    }

    const newCategory = {
      name: _onCategoryName,
      categoryId: uuidv4(),
    };

    toast.success("Successfully created!");
    if(_onEditableCategory == null){
        dispatch(postCategories(newCategory));
        _onSetCategoryName("");
      }else{
        dispatch(updateCategories({id:_onEditableCategory.id, name:_onCategoryName}))
      }
  };
  useEffect(() => {
    _onCategoryName;
  }, [_onCategoryName]);
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-6">
        <input
          onChange={(e) => _onSetCategoryName(e.target.value)}
          value={_onCategoryName}
          type="text"
          placeholder="Category Name..."
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Create Category</button>
      </form>
    </>
  );
};
export default CreateCategory;
