import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ResponsiveAppBar from '../NavBar';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createOrder } from '../../services/orderServices';
import { reset } from '../../store/cartSlice';
import { resetAddress } from '../../store/addressSlice';
import toast from 'react-hot-toast'
import { updateNav } from '../../store/navSlice';
import { useNavigate } from 'react-router-dom';

function Copyright() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        HoardIndia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Verify details', 'Review order'];



export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState(null)
  const addressInfo = useSelector(store=>store.addressInfo)
  const cart = useSelector(store=> store.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 2:
        return <Review />;
      default:
        return null
    }
  }

  const validateStepOne = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const regexMobile = /^[0-9]{10}$/;
    const regexPincode = /^[0-9]{6}$/;
  
    if (addressInfo?.name.trim() === '') {
      toast.error('Please enter your full name');
      return false;
    } else if (addressInfo?.address.trim() === '') {
      toast.error('Please enter your shipping address');
      return false;
    } else if (regexEmail.test(addressInfo?.email.trim()) === false) {
      toast.error('Please enter a valid email');
      return false;
    } else if (regexMobile.test(addressInfo?.phone.trim()) === false) {
      toast.error('Please enter a valid phone number');
      return false;
    } else if (addressInfo?.city.trim() === '') {
      toast.error('Please enter city');
      return false;
    } else if (addressInfo?.state.trim() === '') {
      toast.error('Please enter state');
      return false;
    } else if (regexPincode.test(addressInfo?.pincode.trim()) === false) {
      toast.error('Please enter a valid pincode');
      return false;
    }
  
    // All validations passed
    return true;
  };

  const handleNext = () => {
    // if(activeStep===0 && !validateStepOne()) return
    if(activeStep===1 && addressInfo?.verified===false){toast.error('Please verify the phone number'); return;} 
    setActiveStep(addressInfo?.verified===false? activeStep + 1: activeStep + 2);
  };

  const handleBack = () => {
    setActiveStep(addressInfo?.verified===false? activeStep - 1: activeStep - 2);
  };

  const handlePayload = async() => {
    const type = ['Sensor', 'Smiley', 'Divine']
    const products = type?.map((item, index)=> {
        let items = cart?.filter(order=> {
          if(item===order.type) return order
        })  
        return {
          type: item,
          order: items,
        }
    })
    const payload = {
      name: addressInfo?.name,
      address: addressInfo.address,
      nearBy: addressInfo.nearBy,
      city: addressInfo.city,
      state: addressInfo.state,
      pincode: addressInfo.pincode,
      products: products,
      phone: addressInfo.phone,
      email: addressInfo.email,

    }
    try{
      const response = await createOrder(payload)
      console.log(response,'responseresponse')
      setOrderId(response?.data?.orderId)
      dispatch(reset())
      dispatch(resetAddress())

    }catch(e){
      console.log(e,'------e')
    }
  }

  useEffect (()=> {
    console.log(activeStep,'activeStep')
    if(activeStep===4){
       handlePayload()
    }
  },[activeStep])

  const navigateHome = () => {
    dispatch(updateNav({value: 0}))
    navigate('/')
  }


  return (
    <Grid container style={{display:'flex !important', flexDirection:'column !important', justifyContent:'center !important' }}>

      <ResponsiveAppBar/>

      <Grid item md={12}>

        <Box >
          <CssBaseline />
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === (steps.length+1) ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #{orderId}. We have sent your order confirmation 
                    via message, and will send you an update when your order has
                    shipped.<br/>
                    Thank You.
                  </Typography>
                  <Button mt={2} variant='outlined' onClick={navigateHome}>Go back to Home page</Button>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        {addressInfo?.verified===false ? 'Back' : 'Edit'}
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : addressInfo?.verified===false? 'Next' : 'Review order'}
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
            <Copyright />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}