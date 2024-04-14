import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../../services/otpServices";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { updateState } from "../../store/addressSlice";
import { useEffect } from "react";
import toast from 'react-hot-toast'

export default function PaymentForm({setActiveStep, activeStep}) {
  const [value, setValue] = useState("");
  const [hash, setHash] = useState(null)
  const [otpSend, setOtpSend] = useState(false)
  const [otpPending, setOtpPending] = useState(true)
  const [isDisable, setIsDisable] = useState(true)
  const addressInfo = useSelector(store=>store.addressInfo)
  const [timer, setTimer] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const dispatch = useDispatch()
  const handleInputChange = (key, value) => {
    console.log({key:key, value:value})
    dispatch(updateState({key:key, value:value}))
  }

  const handleEdit = () => {
    setIsDisable(false)
  }

  const handleChange = (newValue) => {
    setValue(newValue);
    if(newValue.length==4){
      handleVerifyOtp(newValue)
    }
  };

  const handleButtonClick = async() => {
    if(!addressInfo?.phone) return 
    console.log(addressInfo?.phone,'phone')
    toast.loading("Sending OTP..")
    setOtpPending(true)
    const response = await sendOtp(`+91${addressInfo?.phone}`)
    if(response?.data?.status === 1){
      toast.dismiss()
      toast.success('OTP Sent!')
      setOtpPending(false)
      setOtpSend(true)
      setHash(response?.data?.hash)
      setButtonDisabled(true);
      setTimer(30); 
    }
    console.log(response,'response')
  }


  const handleVerifyOtp = async(otp) => {
    const params = {
      otp:otp,
      phone:`+91${addressInfo?.phone}`,
      hash:hash
    }
    toast.dismiss()
    const response = await verifyOtp(params)
    if(response?.data?.status === 1) {
      handleInputChange('verified', true)
      toast.success(response?.data?.message)
      dispatch(updateState({key:'verified', value:true}))
      setActiveStep(activeStep+1)
    }else{
      toast.error(response?.data?.message)
    }
    console.log(response,'-------response of verification')
  }

  useEffect(() => {
    let interval;
    if (timer > 0 && buttonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, buttonDisabled]);
  return (
    <>
      {addressInfo.verified===false &&
        <>
        <Typography variant="h6" gutterBottom>
          OTP Verification
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={8} md={6} display={'flex'} alignItems={'center'} mt={5}>
              <TextField
                required
                id="phoneNumber"
                label="Phone Number"
                fullWidth
                variant="standard"
                value = {addressInfo.phone}
                onChange={(e)=>handleInputChange('phone', e.target.value)}
                disabled={isDisable}
              />
              <EditIcon sx={{ml:1, opacity:isDisable?0.8:0.5, cursor:isDisable?'pointer':'default'}} onClick={handleEdit}/>
            </Grid>
            <Grid item xs={4} md={6} display={"flex"} flexDirection={'column'} justifyContent={'space-around'} alignItems={"center"} mt={5}>
              <SendToMobileIcon onClick={handleButtonClick} sx={{cursor:buttonDisabled?'default':"pointer", color:buttonDisabled?'grey': 'primary'}}/>
              {
                timer===0? 
                <Typography variant='caption'>{otpSend ? 'Resend OTP' : 'Send OTP'}</Typography>:
                <Typography color={'grey'} variant='caption'>0:{timer.toString().length>1?timer:`0${timer}`}</Typography>
              }
            </Grid>
            {otpSend?
            <>
            <Grid item xs={12} md={12}>
              <Box sx={{display: 'flex', justifyContent:"center", alignItems:'center', margin: '20px 50px'}}>
                <MuiOtpInput
                  length={4}
                  autoFocus
                  value={value}
                  onChange={handleChange}
                  // margin={'auto'}
                />
              </Box>
            </Grid>
            {/* <Grid item xs={4} md={6} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
              {!addressInfo?.verified?
              <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <CheckCircleOutlineIcon fontSize={'large'} onClick={handleVerifyOtp} sx={{cursor:'pointer'}}/>
              <Typography variant='caption'>Verify OTP</Typography>
              </div>
              :
              <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <CheckCircleIcon fontSize={'large'} sx={{color:'green'}} />
              <Typography variant='caption'>OTP Verified</Typography>
              </div>
              }
            </Grid> */}
            </>: null}
        </Grid>
        </>
      }

      {addressInfo.verified===true &&
        // <>
        <Typography variant="h6" gutterBottom>
          Phone Number Verified
        </Typography>
      }
    </>
  );
}
