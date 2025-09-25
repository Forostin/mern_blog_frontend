import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=>{
    const { data } = await axios.post('/auth/login', params);
    return data;
});


const initialState = {
         data: null,
         status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',     
    initialState,
    extraReducers:{
            [fetchUserData.pending] : (state)=>{
                   state.posts.status = 'loading';
                   state.data = null;
            } ,
            [fetchUserData.fulfilled] : (state, action)=>{
                   state.data = action.payload;
                   state.data.status = 'loaded';
            } ,
            [fetchUserData.rejected] : (state)=>{
                   state.posts.status = 'error';
                   state.data = null;
             }
    }
});

export const authReduser = authSlice.reducer;