import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params)=>{   
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params)=>{   
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params)=>{
    const { data } = await axios.get('/auth/me');
    return data;
});
 

const initialState = {
         data: null,
         status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',     
    initialState,
    reducers:{
          logout: (state)=>{
              state.data = null;
          }
    },
    extraReducers: ( builder )=>{
       builder
           .addCase(fetchAuth.pending, (state)=>{
              state.status = 'loading';
              state.data = null;
           })
           .addCase(fetchAuth.fulfilled, (state, action)=>{
               state.data = action.payload;
               state.status = 'loaded';
           })
           .addCase(fetchAuth.rejected, (state)=>{
                state.status = 'error';
                state.data = null;
           })
       builder
            .addCase(fetchAuthMe.pending, (state)=>{
                   state.status = 'loading';
                   state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action)=>{
                   state.data = action.payload;
                   state.status = 'loaded';
            })
            .addCase(fetchAuthMe.rejected, (state)=>{
                   state.status = 'error';
                   state.data = null;
            })

       builder 
            .addCase(fetchRegister.pending, (state)=>{
                   state.status = 'loading';
                   state.data = null;
            })     
            .addCase(fetchRegister.fulfilled, (state, action)=>{
                   state.data = action.payload;
                   state.status = 'loaded';
            })
            .addCase(fetchRegister.rejected, (state)=>{
                   state.status = 'error';
                   state.data = null;
            })
            
       //      [fetchAuth.pending] : (state)=>{
       //             state.status = 'loading';
       //             state.data = null;
       //      } ,
       //      [fetchAuth.fulfilled] : (state, action)=>{
       //             state.data = action.payload;
       //             state.status = 'loaded';
       //      } ,
       //      [fetchAuth.rejected] : (state)=>{
       //             state.status = 'error';
       //             state.data = null;
       //      },
       //       [fetchAuthMe.pending] : (state)=>{
       //             state.status = 'loading';
       //             state.data = null;
       //      } ,
       //      [fetchAuthMe.fulfilled] : (state, action)=>{
       //             state.data = action.payload;
       //             state.status = 'loaded';
       //      } ,
       //      [fetchAuthMe.rejected] : (state)=>{
       //             state.status = 'error';
       //             state.data = null;
       //      },
       //       [fetchRegister.pending] : (state)=>{
       //             state.status = 'loading';
       //             state.data = null;
       //      } ,
       //      [fetchRegister.fulfilled] : (state, action)=>{
       //             state.data = action.payload;
       //             state.status = 'loaded';
       //      } ,
       //      [fetchRegister.rejected] : (state)=>{
       //             state.status = 'error';
       //             state.data = null;
       //      }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReduser = authSlice.reducer;