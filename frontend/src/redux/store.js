import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'


 export const store = configureStore ({
     reducer: {
        auth: authReducer,
     }
 })









// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from './userSlice';
// import storage from "redux-persist/lib/storage";
// import  { persistReducer } from 'redux-persist'
// import { thunk } from "redux-thunk";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: [userState]
// }

// const rootReducer = combineReducers({
//     userState: userReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore ({
//     reducer: {
//         user: persistReducer,
//         middleware: [thunk]
//     }
// })