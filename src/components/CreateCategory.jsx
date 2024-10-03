
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {postCategories, updateCategories} from "../features/categories/categoriesSlice"

const CreateCategory = ({_onHandleSubmit, _setInputValue, _inputValue, _editableCategory}) => {
  return (
    <>
      <form onSubmit={_onHandleSubmit} className="flex gap-6">
        <input
          onChange={(e) => _setInputValue(e.target.value)}
          value={_inputValue}
          type="text"
          placeholder="Category Name..."
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">{_editableCategory == null ? "Create Category":"Updated Category"}</button>
      </form>
    </>
  );
};
export default CreateCategory;
