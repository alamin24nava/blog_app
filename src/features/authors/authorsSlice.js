import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const { REACT_APP_API_BASE_URL } = import.meta.env;
const REACT_APP_API_BASE_URL = "http://localhost:3000";
const initialState = {
  authorList: [],
  editableAuthor:null,
  isLoading: false,
  isError: false,
};
export const getAuthors = createAsyncThunk(
  "authors/getAuthors",
  async () => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/authors`);
    return response.json();
  }
);

// export const postCategories = createAsyncThunk(
//   "categories/postCategories",
//   async (newCategory) => {
//     const response = await fetch(`${REACT_APP_API_BASE_URL}/categories`, {
//       method:"POST",
//       headers:{'Content-Type': 'application/json'},
//       body:JSON.stringify(newCategory)
//     });
//     return response.json();
//   }
// );
// export const updateCategories = createAsyncThunk(
//   "categories/updateCategories",
//   async (editableCategory) => {
//     const response = await fetch(`${REACT_APP_API_BASE_URL}/categories`, {
//       method:"PUT",
//       headers:{'Content-Type': 'application/json'},
//       body:JSON.stringify(editableCategory)
//     });
//     return response.json();
//   }
// );

// export const deleteCategories = createAsyncThunk(
//   "categories/deleteCategories",
//   async (id) => {
//     const response = await fetch(`http://localhost:3000/categories/${id}`, {method:"DELETE"})
//     return id
//   }
// );

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  extraReducers: (builder) => {   
    builder.addCase(getAuthors.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.authorList = action.payload;
    });
    builder.addCase(getAuthors.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // // postCategories
    // builder.addCase(postCategories.pending, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(postCategories.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.categoryList.push(action.payload);
    // });
    // builder.addCase(postCategories.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });
    // // deleteCategories
    // builder.addCase(deleteCategories.pending, (state) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(deleteCategories.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.categoryList = state.categoryList.filter((item)=> item.id !== action.payload)
    //   console.log(action.payload)
    // });
    // builder.addCase(deleteCategories.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });
    // // UpdateCategories
    // builder.addCase(updateCategories.pending, (state) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(updateCategories.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   console.log(action.payload)
    // });
    // builder.addCase(updateCategories.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });


  },
});

// Action creators are generated for each case reducer function
export const {} = authorsSlice.actions;
export const authorsGetuseSelector = (state) => state.authors;
export default authorsSlice.reducer;
