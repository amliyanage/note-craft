import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
    async (user : FormData)=> {
        try{
            const  response = await api.post("/auth/register" , user , {withCredentials : true})
            return response.data
        } catch (error){
            console.log(error)
        }
    }
)

export const googleSignUp = createAsyncThunk(
    "user/google-signup",
    async (token : { token : string })=> {
        try{
            console.log("yanatoken ",token)
            const response = await api.post("/auth/google-signup", { token }, { withCredentials: true });
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
        builder
            .addCase(googleSignUp.pending , (state) => {
                console.log("Google Signing Up")
                state.loading = true
            })
            .addCase(googleSignUp.fulfilled , (state) => {
                console.log("Google Signed Up")
                state.loading = false
            })
            .addCase(googleSignUp.rejected , (state, action) => {
                console.log("Error Google Signing Up")
                state.loading = false
                state.error = action.payload as string;
            })
    }
})

export default userSlice.reducer
export const {logOutUser} = userSlice.actions