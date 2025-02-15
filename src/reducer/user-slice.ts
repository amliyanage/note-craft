import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../model/User.ts";

const initialState = {
    jwt_token : null,
    refresh_token : null,
    username : null,
    isAuthenticated : false,
    loading : false,
    error: ""
}

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const registerUser = createAsyncThunk(
    "user/register",
    async (user : User)=> {
        try{
            const  response = await api.post("/auth/register" , {user} , {withCredentials : true})
            return response.data
        } catch (error){
            console.log(error)
        }
    }
)

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        logOutUser(state){
            state.isAuthenticated = false
        }
    } ,
    extraReducers (builder){
        builder
            .addCase(registerUser.pending , (state) => {
                console.log("Registering User")
                state.loading = true
            })
            .addCase(registerUser.fulfilled , (state) => {
                console.log("User Registered")
                state.loading = false
            })
            .addCase(registerUser.rejected , (state, action) => {
                console.log("Error Registering User")
                state.loading = false
                state.error = action.payload as string;
            })
    }
})

export default userSlice.reducer
export const {logOutUser} = userSlice.actions