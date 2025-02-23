import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    jwt_token : null,
    refresh_token : null,
    username : null,
    isAuthenticated : false,
    loading : false,
    error: "",
    forgotPassword : false
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

export const loginUser = createAsyncThunk(
    "user/login",
    async (loginData : { userName :string , password : string }) => {
        try {
            const response = await api.post("/auth/login", loginData, { withCredentials: true });
            return {
                status : response.status,
                ... response.data
            }
        } catch (error){
            console.log(error)
        }
    }
)

export const googleLogin = createAsyncThunk(
    "user/google-login",
    async (token : { token : string }) => {
        try {
            const response = await api.post("/auth/google-login", token, { withCredentials: true });
            return {
                status : response.status,
                ... response.data
            }
        } catch (error){
            console.log(error)
        }
    }
)

export const verifyEmail = createAsyncThunk(
    "user/verify-email",
    async (email : string) => {
        try {
            const response = await api.post("/auth/send-email/"+email , { withCredentials: true });
            return {
                status : response.status,
                ... response.data
            }
        } catch (error){
            console.log(error)
        }
    }
)

export const CheckOTP = createAsyncThunk(
    "user/verify-otp",
    async ({email , otp} : { email : string , otp :string }) => {
        try {
            const response = await api.post("/auth/verify-otp/"+email+"/"+otp , { withCredentials: true });
            return {
                status : response.status,
                ... response.data
            }
        } catch (error){
            console.log(error)
        }
    }
)

export const refreshToken = createAsyncThunk(
    "user/refresh-token",
    async (refreshToken: string) => {
        try {
            const response = await api.post("/auth/refresh-token", {}, {
                headers: {
                    "Authorization": `Bearer ${refreshToken}`
                },
                withCredentials: true
            });
            return {
                status: response.status,
                ...response.data
            };
        } catch (error) {
            console.log(error);
        }
    }
);


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
        builder
            .addCase(loginUser.pending , (state) => {
                console.log("Logging In")
                state.loading = true
            })
            .addCase(loginUser.fulfilled , (state, action) => {
                console.log("Logged In")
                state.loading = false
                if (action.payload && action.payload.status === 201){
                    state.isAuthenticated = true
                    state.jwt_token = action.payload.token
                    state.refresh_token = action.payload.refreshToken
                    state.username = action.payload.username
                    toast.success("Logged In")
                } else {
                    toast.error("Invalid Credentials")
                }
            })
            .addCase(loginUser.rejected , (state, action) => {
                console.log("Error Logging In")
                state.loading = false
                state.error = action.payload as string;
                toast.error("Invalid Credentials")
            })
        builder
            .addCase(googleLogin.pending , (state) => {
                console.log("Google Logging In")
                state.loading = true
            })
            .addCase(googleLogin.fulfilled , (state, action) => {
                console.log("Google Logged In")
                state.loading = false
                if (action.payload && action.payload.status === 201){
                    state.isAuthenticated = true
                    state.jwt_token = action.payload.token
                    state.refresh_token = action.payload.refreshToken
                    state.username = action.payload.username
                    toast.success("Logged In")
                } else {
                    toast.error("Invalid Credentials")
                }
            })
            .addCase(googleLogin.rejected , (state, action) => {
                console.log("Error Google Logging In")
                state.loading = false
                state.error = action.payload as string;
                state.forgotPassword = false
                toast.error("Invalid Credentials")
            })
        builder
            .addCase(verifyEmail.pending , (state) => {
                console.log("Verifying Email")
                state.loading = true
            })
            .addCase(verifyEmail.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload && action.payload.status === 201){
                    state.forgotPassword = true
                    toast.success("Email Sent")
                } else {
                    toast.error("Invalid Email")
                }
            })
            .addCase(verifyEmail.rejected , (state, action) => {
                console.log("Error Verifying Email")
                state.loading = false
                state.error = action.payload as string;
                state.forgotPassword = false
                toast.error("Invalid Email")
            })
        builder
            .addCase(CheckOTP.pending , (state) => {
                console.log("Verifying OTP")
                state.loading = true
            })
            .addCase(CheckOTP.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload && action.payload.status === 201){
                    state.forgotPassword = false
                    toast.success("OTP Verified")
                    state.isAuthenticated = true
                    state.jwt_token = action.payload.token
                    state.refresh_token = action.payload.refreshToken
                    state.username = action.payload.username
                } else {
                    toast.error("Invalid OTP")
                }
            })
            .addCase(CheckOTP.rejected , (state, action) => {
                console.log("Error Verifying OTP")
                state.loading = false
                state.error = action.payload as string;
                state.forgotPassword = false
                toast.error("Invalid OTP")
            })
        builder
            .addCase(refreshToken.pending , (state) => {
                console.log("Refreshing Token")
                state.loading = true
            })
            .addCase(refreshToken.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload && action.payload.status === 201){
                    state.isAuthenticated = true
                    state.jwt_token = action.payload.token
                } else {
                    console.log("Error Refreshing Token")
                }
            })
            .addCase(refreshToken.rejected , (state, action) => {
                console.log("Error Refreshing Token")
                state.loading = false
                state.error = action.payload as string;
            })
    }
})

export default userSlice.reducer
export const {logOutUser} = userSlice.actions