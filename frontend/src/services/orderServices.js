import axios from 'axios'

const url = 'http://localhost:5000'

export const createOrder = async(params) => {
    return await axios.post(`${url}/order/createOrder`,params)
}

export const fetchSingleOrder = async(params) => {
    return await axios.post(`${url}/order/fetchSingleOrder`,params)
}

export const createInquiry = async(params) => {
    return await axios.post(`${url}/order/createInquiry`,params)
}

