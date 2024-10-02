import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { REACT_APP_API_BASE_URL } = import.meta.env;
console.log(REACT_APP_API_BASE_URL)
const initialState = {
  categoryList: [],
  categoryId: "",
  editableCategory: null,
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
    const response = await fetch(`${REACT_APP_API_BASE_URL}/categories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editableCategory),
    });
    return response.json();
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
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
  reducers: {
    EDITABLE_CATEGORY: (state, action) => {
      state.editableCategory = action.payload;
    },
  },
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
    });
    builder.addCase(updateCategories.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { EDITABLE_CATEGORY } = categoriesSlice.actions;
export const categoriesGetuseSelector = (state) => state.categories;
export default categoriesSlice.reducer;
