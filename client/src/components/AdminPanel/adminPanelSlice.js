import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    dialogUsersOpen: false,
    dialogAddUserOpen: false,
    dialogAddCourseOpen: false,
    users: [],
    status: 'idle',
    usersChanged: 0,
    reloadCourses: 0,
};

export const requestAllUsers = createAsyncThunk(
    'adminPanel/requestAll',
    async (data) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/users/',
                {
                    headers: {
                        'Authorization': 'Bearer ' + data
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return (error.response.data)
        }
    }
)

export const addUser = createAsyncThunk(
    'adminPanel/addUser',
    async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/signup',
                {
                    firstName: data.name,
                    lastName: data.name2,
                    email: data.email,
                    role: data.role,
                    password: data.password
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return (error.response.data)
        }
    }
)

export const addCourse = createAsyncThunk(
    'adminPanel/addCourse',
    async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/courses',
                data.course,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return (error.response.data)
        }
    }
)

export const removeUser = createAsyncThunk(
    'adminPanel/removeUser',
    async (data) => {
        try {
            const response = await axios.delete(
                'http://localhost:5000/api/users/'+data._id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return (error.response.data)
        }
    }
)

export const adminPanelSlice = createSlice({
    name: 'adminPanel',
    initialState,
    reducers: {
        setDialogUsersOpen: (state, action) => {
            state.dialogUsersOpen = action.payload;
        },
        setDialogAddUserOpen: (state, action) => {
            state.dialogAddUserOpen = action.payload
        },
        setDialogAddCourseOpen: (state, action) => {
            state.dialogAddCourseOpen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(requestAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.data.doc
                state.status = 'idle';
            })
            .addCase(addUser.fulfilled, (state) => {
                let box = state.usersChanged
                box = box + 1
                state.usersChanged = box;
            })
            .addCase(removeUser.fulfilled, (state) => {
                let box = state.usersChanged
                box = box + 1
                state.usersChanged = box;
            })
            .addCase(addCourse.fulfilled, (state) => {
                let box = state.reloadCourses
                box = box + 1
                state.reloadCourses = box;
            });
    },
});

export const { setDialogUsersOpen, setDialogAddUserOpen, setDialogAddCourseOpen } = adminPanelSlice.actions;

export const getDialogUsersOpen = (state) => state.adminPanel.dialogUsersOpen

export const getDialogAddUserOpen = (state) => state.adminPanel.dialogAddUserOpen

export const getDialogAddCourseOpen = (state) => state.adminPanel.dialogAddCourseOpen

export const getUsers = (state) => state.adminPanel.users

export const getUsersChanged = (state) => state.adminPanel.usersChanged

export const getReloadCourses = (state) => state.adminPanel.reloadCourses

export default adminPanelSlice.reducer;
