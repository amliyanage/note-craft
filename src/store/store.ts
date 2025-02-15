import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../reducer/user-slice.ts";

export const store = configureStore({
    reducer: {
        userReducer: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch