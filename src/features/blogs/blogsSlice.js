import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { REACT_APP_API_BASE_URL } = import.meta.env;
const initialState = {
  blogList: [],
  isLoading: false,
  isError: false,
};
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async () => {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/posts`);
    return response.json();
  }
);

// export const postTags = createAsyncThunk(
//   "tags/postTags",
//   async (newTag) => {
//     const response = await fetch(`${REACT_APP_API_BASE_URL}/tags`, {
//       method:"POST",
//       headers:{'Content-Type': 'application/json'},
//       body:JSON.stringify(newTag)
//     });
//     return response.json();
//   }
// );

// export const updateTags = createAsyncThunk(
//   "tags/updateTags",
//   async (editableTag) => {
//     const response = await fetch(`${REACT_APP_API_BASE_URL}/tags/${editableTag.id}`, {
//       method:"PUT",
//       headers:{'Content-Type': 'application/json'},
//       body:JSON.stringify(editableTag)
//     });
//     return response.json();
//   }
// );

// export const deleteTags = createAsyncThunk(
//   "tags/deleteTags",
//   async (id) => {
//     await fetch(`${REACT_APP_API_BASE_URL}/tags/${id}`, {method:"DELETE"})
//     return id
//   }
// );

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {   
    builder.addCase(getBlogs.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.blogList = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    // // postTags
    // builder.addCase(postTags.pending, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(postTags.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.tagList.push(action.payload);
    // });
    // builder.addCase(postTags.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });
    // // // // deleteTags
    // builder.addCase(deleteTags.pending, (state) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(deleteTags.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.tagList = state.tagList.filter((item)=> item.id !== action.payload)
    // });
    // builder.addCase(deleteTags.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });
    // // updateTags
    // builder.addCase(updateTags.pending, (state) => {
    //   state.isError = false;
    //   state.isLoading = true;
    // });
    // builder.addCase(updateTags.fulfilled, (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   const findIndex = state.tagList.findIndex((item)=> item.id === action.payload.id)
    //   state.tagList[findIndex].name = action.payload.name
    // });
    // builder.addCase(updateTags.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    // });


  },
});

// Action creators are generated for each case reducer function
export const {} = blogsSlice.actions;
export const blogsGetuseSelector = (state) => state.blogs;
export default blogsSlice.reducer;
