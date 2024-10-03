import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  categoriesGetuseSelector,
  getCategories,
} from "../features/categories/categoriesSlice";
import { authorsSlice,postAuthors } from "../features/authors/authorsSlice";

import DropDownMenu from "./DropDownMenu";
const CreateAuthor = () => {
  const { categoryList } = useSelector(categoriesGetuseSelector);
  const dispatch = useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(postAuthors(null))
    }
    useEffect(()=>{
        handleSubmit
    }, [])
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-6">
        {/* <select className="select select-bordered w-full max-w-xs">
          <option>-- Choose Category --</option>
          {categoryList?.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select> */}

        <DropDownMenu _dropDownItems={categoryList} />
        <input
          type="text"
          placeholder="Author Name..."
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Create Author</button>
      </form>
    </>
  );
};
export default CreateAuthor;
