import { createSlice } from "@reduxjs/toolkit";

import { BlogState } from "../models/blog";

const initialState: BlogState = {
  blogPosts: [],
  currentBlogPost: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogPosts(state, action) {
      // Sort blog posts in descending order of date
      const sortedPosts = action.payload.reverse();

      state.blogPosts = sortedPosts;
    },
    setCurrentBlogPost(state, action) {
      state.currentBlogPost = action.payload;
    },
  },
});

export const { setBlogPosts, setCurrentBlogPost } = blogSlice.actions;
export default blogSlice.reducer;
