import axios from 'axios'

// const url = 'http://localhost:5000'
const url = 'http://5.161.224.84:5000/'

export const sendOtp = async(params) => {
    return await axios.post(`${url}/otp/sendOtp`,{params})
}

export const verifyOtp = async(params) => {
    return await axios.post(`${url}/otp/verifyOtp`,params)
}

