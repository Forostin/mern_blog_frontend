import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
           const { data } = await axios.get('/posts');
           return data
});
// ------сортировка по дате:
export const sortTimePosts = createAsyncThunk('posts/sortTimePosts', async()=>{
       const { data } = await axios.get('/posts/sortTime');
       return data
})
// ------сортировка по просмотрам:
export const sortPopularPosts = createAsyncThunk('posts/sortPopularPosts', async () => {
  const { data } = await axios.get('/posts/popular');
  return data;
});

// ------ сортировка по тегу:
export const sortPostsTag = createAsyncThunk('posts/sortPostsTag', async (tagName) => {
  const { data } = await axios.get(`/posts/sortTag/${tagName}`);
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async()=>{
           const { data } = await axios.get('/tags');
           return data 
});

export const fetchDeletePost = createAsyncThunk(
  'posts/fetchDeletePost',
   async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
});

// --------------------- Удаление комментария:
export const deleteComment = async (id) => {
  return axios.delete(`/comments/${id}`);
};


const initialState = {
    posts : {
         items: [],
         status: 'loading'
    }, 
    tags : {
         items: [],
         status: 'loading'
    }
};

// const postsSlice = createSlice({
//     name : 'posts',
//     initialState,
//     reducers : {},
//     extraReducers:{
//        // Получение саттей
//         [fetchPosts.pending] : (state)=>{
//                state.posts.items = [];
//                state.posts.status = 'loading';
//         } ,
//         [fetchPosts.fulfilled] : (state, action)=>{
//                state.posts.items = action.payload;
//                state.posts.status = 'loaded';
//         } ,
//         [fetchPosts.rejected] : (state)=>{
//                state.posts.items = [];
//                state.posts.status = 'error';
//         } ,
//        //  Получение тегов
//         [fetchTags.pending] : (state)=>{
//                state.tags.items = [];
//                state.tags.status = 'loading';
//         } ,
//         [fetchTags.fulfilled] : (state, action)=>{
//                state.tags.items = action.payload;
//                state.tags.status = 'loaded';
//         } ,
//         [fetchTags.rejected] : (state)=>{
//                state.tags.items = [];
//                state.tags.status = 'error';
//         } ,
//        //  Удаление статьи
//        [fetchDeletePost.pending] : (state, action)=>{
//                state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
//        } ,
//        [fetchDeletePost.rejected] : (state)=>{
//                state.posts.items = [];
//                state.posts.status = 'error';
//        },
//        // Сортировка постов по дате:
//         [sortTimePosts.pending] : (state)=>{
//                state.posts.items = [];
//                state.posts.status = 'loading';
//         } ,
//         [sortTimePosts.fulfilled] : (state, action)=>{
//                state.posts.items = action.payload;
//                state.posts.status = 'loaded';
//         } ,
//         [sortTimePosts.rejected] : (state)=>{
//                state.posts.items = [];
//                state.posts.status = 'error';
//         } ,
//        // Сортировка по просмотрам:
//         [sortPopularPosts.pending]: (state) => {
//                state.posts.items = [];
//                state.posts.status = 'loading';
//         },
//         [sortPopularPosts.fulfilled]: (state, action) => {
//                state.posts.items = action.payload;
//                state.posts.status = 'loaded';
//         },
//         [sortPopularPosts.rejected]: (state) => {
//                state.posts.items = [];
//                state.posts.status = 'error';
//         },
//        //  сортировка по тегу:
//         [sortPostsTag.pending]: (state) => {
//                state.posts.items = [];
//                state.posts.status = 'loading';
//         },
//         [sortPostsTag.fulfilled]: (state, action) => {
//                state.posts.items = action.payload;
//                state.posts.status = 'loaded';
//         },
//         [sortPostsTag.rejected]: (state) => {
//                state.posts.items = [];
//                state.posts.status = 'error';
//         },
//     }
// });

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение статей
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    // Получение тегов
    builder
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      });

    // Удаление статьи
    builder
      .addCase(fetchDeletePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchDeletePost.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    // Сортировка по дате
    builder
      .addCase(sortTimePosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(sortTimePosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(sortTimePosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    // Сортировка по популярности
    builder
      .addCase(sortPopularPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(sortPopularPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(sortPopularPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    // Сортировка по тегу
    builder
      .addCase(sortPostsTag.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(sortPostsTag.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(sortPostsTag.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });
  },
});


export const postsReducer = postsSlice.reducer