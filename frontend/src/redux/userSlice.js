import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    imageUrl: "",
    idUser: "",
    username: "",
    email: "",
};

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {token, imageUrl, idUser, username, email} = action.payload;
            state.token = token;
            state.imageUrl = imageUrl;
            state.idUser = idUser;
            state.username = username;
            state.email = email;
        },
        changeToken: (state, action) => {
            state.token = action.payload;
        },
        changeImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
        changeIdUser: (state, action) => {
            state.idUser = action.payload;
        },
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
    }
});

export const { setUser } = userSlice.actions;
export const {addUser, changeEmail, changeIdUser, changeImageUrl, changeToken, changeUsername} = userSlice.actions;
export default userSlice.reducer;