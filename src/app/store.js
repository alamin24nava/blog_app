import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categories/categoriesSlice'
import authorsReducer from '../features/authors/authorsSlice'
export const store = configureStore({
  reducer : {
    categories: categoriesReducer,
    authors:authorsReducer
  },
})

export default store;