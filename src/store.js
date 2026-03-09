import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer  from "./features/auth/authSlice";
import productReducer from './features/products/productSlice'
import userReducer from './features/users/userSlice'

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const reducers = combineReducers({
     auth: authReducer,
     products: productReducer,
     users: userReducer
})

const persistConfig ={
    key:"root",
    storage,
    whitelist:["auth", "products","users"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

const persistor = persistStore(store)
export {store, persistor}