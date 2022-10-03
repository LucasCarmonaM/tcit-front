import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const POSTS_URL = "http://localhost:3001/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const getPosts = createAsyncThunk("pots/getPosts", async () => {
  try {
    const { data } = await axios({
      url: POSTS_URL,
      method: "GET",
      baseURL: "",
    });
    return [...data.data];
  } catch (err) {
    console.log("err", err);
  }
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const id = postId;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return postId;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addPostClient",
  async (postData) => {
    const { data } = await axios.post(POSTS_URL, postData);
    return data;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    deletePostClient(state, action) {
      const id = action.payload;
      state.posts = _.filter(state.posts, (post) => post.id !== id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const addedPost = action.payload;
        state.posts.push(addedPost);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { deletePostClient, addPostClient } = postSlice.actions;

export default postSlice.reducer;
