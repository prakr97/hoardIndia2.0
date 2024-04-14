// const { createSlice } = require('@reduxjs/toolkit');
import {createSlice, current} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addNew(state, action) {
            const payload = action.payload
            payload.quantity=payload.quantity+1
            const newState = [
                ...current(state),
                payload
            ]
            return newState
        },
        modify(state, action) {
            const type = action.payload.type
            const productId = action.payload.id

            const newState = current(state).map((item) => {
                if (item.id === productId && type === 'plus') {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (item.id === productId && type === 'minus') {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter((item) => item.quantity > 0)
            return newState
        },
        reset(state, action) {
            return [];
        },
    },
});

export const { addNew, modify, reset } = cartSlice.actions;
export default cartSlice.reducer;