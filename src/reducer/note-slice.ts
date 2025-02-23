import {Note} from "../model/Note.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

const initialState : { notes : Note[] , loading : boolean , error : string } = {
    notes : [] ,
    loading : false,
    error : ""
}

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const saveNote = createAsyncThunk(
    "note/save-note",
    async ({ note, jwt_token }: { note: FormData, jwt_token: string }) => {
        try {
            const response = await api.post("/note/save", note, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            return {
                comingStatus: response.status,
                ...response.data
            };
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllUserNotes = createAsyncThunk(
    "note/get-all-notes",
    async ({ username, jwt_token }: { username: string, jwt_token: string }) => {
        try {
            const response = await api.get(`/note/getNoteByUser/${username}`, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                }
            });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateNote = createAsyncThunk(
    "note/update-note",
    async ({ note, jwt_token }: { note: FormData, jwt_token: string }) => {
        try {
            const response = await api.put("/note/update/"+note.get("noteId"), note, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            return {
                comingStatus: response.status,
                ...response.data
            };
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteNote = createAsyncThunk(
    "note/delete-note",
    async ({ noteId, jwt_token }: { noteId: string, jwt_token: string }) => {
        try {
            const response = await api.delete(`/note/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                }
            });
            return {
                comingStatus: response.status,
                ...response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
)

export const changeVisibility = createAsyncThunk(
    "note/change-visibility",
    async ({ noteId, visibility, jwt_token }: { noteId: string, visibility: string, jwt_token: string }) => {
        try {
            const response = await api.put(`/note/changeVisibility/${noteId}`, { visibility }, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                }
            });
            return {
                comingStatus: response.status,
                ...response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
)

export const chaneFavourite = createAsyncThunk(
    "note/change-favourite",
    async ({ noteId, isFavourite, jwt_token }: { noteId: string, isFavourite: string, jwt_token: string }) => {
        try {
            const response = await api.put(`/note/changeFavourite/${noteId}`, { isFavourite }, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                }
            });
            return {
                comingStatus: response.status,
                ...response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
)

const noteSlice = createSlice({
    name : "note",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(saveNote.pending , (state) => {
                state.loading = true
            })
            .addCase(saveNote.fulfilled , (state , action) => {
                state.loading = false
                console.log(action.payload.comingStatus)
                if (action.payload.comingStatus === 201){
                    state.notes.push(action.payload)
                    toast.success("Note saved successfully")
                }else {
                    toast.error("Failed to save note")
                }
            })
            .addCase(saveNote.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
                toast.error("Failed to save note")
            })
        builder
            .addCase(getAllUserNotes.pending , (state) => {
                state.loading = true
            })
            .addCase(getAllUserNotes.fulfilled , (state , action) => {
                state.loading = false
                state.notes = action.payload
            })
            .addCase(getAllUserNotes.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
            })
        builder
            .addCase(updateNote.pending , (state) => {
                state.loading = true
            })
            .addCase(updateNote.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload.comingStatus === 200){
                    state.notes = state.notes.map(note => {
                        if (note.noteId === action.payload.noteId){
                            return action.payload
                        }
                        return note
                    })
                    toast.success("Note updated successfully")
                }else {
                    toast.error("Failed to update note")
                }
            })
            .addCase(updateNote.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
                toast.error("Failed to update note")
            })
        builder
            .addCase(deleteNote.pending , (state) => {
                state.loading = true
            })
            .addCase(deleteNote.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload.comingStatus === 201){
                    state.notes = state.notes.filter(note => note.noteId !== action.payload.noteId)
                    toast.success("Note deleted successfully")
                }else {
                    toast.error("Failed to delete note")
                }
            })
            .addCase(deleteNote.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
                toast.error("Failed to delete note")
            })
        builder
            .addCase(changeVisibility.pending , (state) => {
                state.loading = true
            })
            .addCase(changeVisibility.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload.comingStatus === 201){
                    state.notes = state.notes.map(note => {
                        if (note.noteId === action.payload.noteId){
                            note.visibility = action.payload.visibility
                        }
                        return note
                    })
                    toast.success("Visibility changed successfully")
                }else {
                    toast.error("Failed to change visibility")
                }
            })
            .addCase(changeVisibility.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
                toast.error("Failed to change visibility")
            })
        builder
            .addCase(chaneFavourite.pending , (state) => {
                state.loading = true
            })
            .addCase(chaneFavourite.fulfilled , (state , action) => {
                state.loading = false
                if (action.payload.comingStatus === 201){
                    state.notes = state.notes.map(note => {
                        if (note.noteId === action.payload.noteId){
                            note.isFavourite = action.payload.isFavourite
                        }
                        return note
                    })
                    toast.success("Favourite changed successfully")
                }else {
                    toast.error("Failed to change favourite")
                }
            })
            .addCase(chaneFavourite.rejected , (state , action) => {
                state.loading = false
                state.error = action.error.message || ""
                toast.error("Failed to change favourite")
            })
    }
})

export default noteSlice.reducer