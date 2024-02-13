import {configureStore} from '@reduxjs/toolkit'
import shopReducer from '../features/shopSlice'
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shopApi } from '../services/shopService'
import { authApi } from '../services/authService'

const store = configureStore({
    reducer:{
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]:shopApi.reducer,
        [authApi.reducerPath]:authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware)
})

setupListeners(store.dispatch)
export default store