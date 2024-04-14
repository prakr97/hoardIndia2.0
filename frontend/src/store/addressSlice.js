// const { createSlice } = require('@reduxjs/toolkit');
import {createSlice, current} from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'addressInfo',
    initialState: {
        name:'',
        address:'',
        nearBy:'',
        city:'',
        state:'',
        pincode:'',
        email:'',
        phone:'',
        verified: false,
        formInputAll: false,
    },
    reducers: {
        updateState(state, action) {
            const {key,value} = action.payload
            let newState 
            if(key==='phone'){
                newState = {
                    ...state,
                    [key]:value,
                    ['verified']: false
                }
            }else{
                newState = {
                    ...state,
                    [key]:value
                }
            }
            console.log({key,value})
            return newState
        },
        resetAddress(state, action) {
            return {
                name:'',
                address:'',
                nearBy:'',
                city:'',
                state:'',
                pincode:'',
                email:'',
                phone:'',
                verified: false
            }
        }
    },
});

export const { updateState, resetAddress } = addressSlice.actions;
export default addressSlice.reducer;