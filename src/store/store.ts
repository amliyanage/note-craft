import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../reducer/user-slice.ts";
import loadingSlice from "../reducer/loading-slice.ts";
import noteSlice from "../reducer/note-slice.ts";

export const store = configureStore({
    reducer: {
        loadingReducer: loadingSlice,
        userReducer: userSlice ,
        noteReducer : noteSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch