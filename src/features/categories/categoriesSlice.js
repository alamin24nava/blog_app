import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { REACT_APP_API_BASE_URL } = import.meta.env;
const initialState = {
  categoryList: [],
  isLoading: false,
  isError: false,
};


export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/categories`);
    return response.json();
  }
);

export const postCategories = createAsyncThunk(
  "categories/postCategories",
  async (newCategory) => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    return response.json();
  }
);
export const updateCategories = createAsyncThunk(
  "categories/updateCategories",
  async (editableCategory) => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/categories/${editableCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editableCategory),
    });
    return response.json();
  }
);

export const deleteCategories = createAsyncThunk(
  "authors/deleteCategories",
  async (id) => {
    await fetch(`${REACT_APP_API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.categoryList = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // postCategories
    builder.addCase(postCategories.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(postCategories.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.categoryList.push(action.payload);
    });
    builder.addCase(postCategories.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // deleteCategories
    builder.addCase(deleteCategories.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.categoryList = state.categoryList.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // UpdateCategories
    builder.addCase(updateCategories.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      const findIndex = state.categoryList.findIndex((item)=> item.id === action.payload.id)
      state.categoryList[findIndex].name = action.payload.name
    });
    builder.addCase(updateCategories.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { } = categoriesSlice.actions;
export const categoriesGetuseSelector = (state) => state.categories;
export default categoriesSlice.reducer;
