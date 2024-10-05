import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import authorsReducer from "../features/authors/authorsSlice";
import tagsReducer from "../features/tags/tagsSlice";
import blogsReducer from "../features/blogs/blogsSlice";
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    authors: authorsReducer,
    tags: tagsReducer,
    blogs: blogsReducer,
  },
});

export default store;
