import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import useReducer from "./redux/User.jsx"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, useReducer)

const store = configureStore({
    reducer:{
        user:persistedReducer
    }
});
  
export const persistor=persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
 
)
