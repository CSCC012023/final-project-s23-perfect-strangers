import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {                             // create a named redux state
        email: '',
        username: ''
    },
    reducers: {
        updateUserInfo: (state, action) => {       // define action to update state
            state.email = action.payload.email;
            state.username = action.payload.username;
        }
    }
});

export const { updateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;