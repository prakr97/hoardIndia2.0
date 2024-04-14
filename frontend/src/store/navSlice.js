// const { createSlice } = require('@reduxjs/toolkit');
import {createSlice} from '@reduxjs/toolkit'

const navSlice = createSlice({
    name: 'nav',
    initialState: 1,
    reducers: {
        updateNav(state, action) {
            const {value} = action.payload
            return value
        },
    },
});

export const { updateNav } = navSlice.actions;
export default navSlice.reducer;