import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { REACT_APP_API_BASE_URL } = import.meta.env;
const initialState = {
  authorList: [],
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

export const postAuthors = createAsyncThunk(
  "authors/postAuthors",
  async (newAuthor) => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/authors`, {
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(newAuthor)
    });
    return response.json();
  }
);

export const updateAuthors = createAsyncThunk(
  "categories/updateAuthors",
  async (editableAuthor) => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/authors/${editableAuthor.id}`, {
      method:"PUT",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(editableAuthor)
    });
    return response.json();
  }
);

export const deleteAuthors = createAsyncThunk(
  "authors/deleteAuthors",
  async (id) => {
    await fetch(`${REACT_APP_API_BASE_URL}/authors/${id}`, {method:"DELETE"})
    return id
  }
);

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
    builder.addCase(postAuthors.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(postAuthors.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.authorList.push(action.payload);
    });
    builder.addCase(postAuthors.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // // deleteCategories
    builder.addCase(deleteAuthors.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteAuthors.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.authorList = state.authorList.filter((item)=> item.id !== action.payload)
    });
    builder.addCase(deleteAuthors.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // updateAuthors
    builder.addCase(updateAuthors.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateAuthors.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      // state.authorList = action.payload
      console.log(action.payload)
      const findIndex = state.authorList.findIndex((item)=> item.id === action.payload.id)
      state.authorList[findIndex].name = action.payload.name
    });
    builder.addCase(updateAuthors.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });


  },
});

// Action creators are generated for each case reducer function
export const {} = authorsSlice.actions;
export const authorsGetuseSelector = (state) => state.authors;
export default authorsSlice.reducer;
