const crypto = require('crypto');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

    
    const sendOtp = async(params) => {
        const  phone  = params;
        if (!phone) {
            return {status:0, message: "Phone Number is required"}
        }

        const otp = crypto.randomInt(1000, 9999)

        const ttl = 1000 * 60 * 2; 
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto
                    .createHmac('sha256', 'secret')
                    .update(data)
                    .digest('hex');

        try {
            await sendBySms(phone, otp);
            return {
                status:1,
                hash: `${hash}.${expires}`
            }
        } catch (err) {
            console.log(err);
            return {status:0, message: "Error while sending otp"}

        }
    }

    const verifyOtp = async({ otp, hash, phone }) => {
        
        console.log({ otp, hash, phone },'{ otp, hash, phone }')
        if (!otp || !hash || !phone) {
            return {status:0, message: "otp, hash, phone is required!"}
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return {status:0, message: "OTP Expired!"}
        }

        const data = `${phone}.${otp}.${expires}`;
        const computedHash = crypto
                            .createHmac('sha256', 'secret')
                            .update(data)
                            .digest('hex');
        console.log(computedHash,'computedHash')
        console.log(hashedOtp,'hashedOtp')
        const isValid = computedHash===hashedOtp
        if (!isValid) {
            return {status:0, message: "Invalid OTP!"}
        }
        else return {status:1, message: "OTP verified!"}
    }

    const sendBySms = async(phone, otp) => {
        return await twilio.messages.create({
            to: phone,
            from: '+447588670121',
            body: `Dear Customer,\nYour One Time Password(OTP) for hoardIndia is ${otp}.\nThank you.`,
        });

    }

    
module.exports = {
    sendOtp,
    verifyOtp,
}