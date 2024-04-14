import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice'
import navReducer from './navSlice'
const store = configureStore({
    reducer: {
        cart: cartReducer,
        addressInfo: addressReducer,
        nav: navReducer
    },
});

export default store;