import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "./NavBar";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateNav } from "../store/navSlice";
import { fetchSingleOrder } from "../services/orderServices";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        HoardIndia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const message = {
    'Pending': 'Your order is ready to be processed and shipped. This process usually takes 1-2 days. We will let you know when your order has been shipped, through sms.',
    'Shipped': 'Your order is already shipped and will arrive soon depending on your address location.',
    'Delivered': 'Your order is already delivered to your address location',
    'Refund Pending': 'Your refund is under process, we will inform you when your refund is executed through sms.',
    'Refunded': 'Refund on your order is already processed and completed.'
};

  const navigateHome = () => {
    dispatch(updateNav({ value: 0 }));
    navigate("/");
  };

  const handleFetchOrderDetail = async() => {
    try{
        const response = await fetchSingleOrder({orderId: orderId})
        setOrderStatus(response?.data?.status)
        console.log(response, '------response')
    }catch(err){
        console.log('Error while fetching order: ', err)
    }
  }

  const handleInput = (e) => {
    setOrderId(e.target.value)
    // console.log(e.target.value, '-----------e.target.value')
  } 

console.log(orderStatus, '0----------orderSatus')
  return (
    <Grid
      container
      style={{
        display: "flex !important",
        flexDirection: "column !important",
        justifyContent: "center !important",
      }}
    >
      <ResponsiveAppBar />

      <Grid item md={12}>
        <Box>
          <CssBaseline />
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h3" variant="h4" align="center">
                Track Your Order
              </Typography>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  mt:2, mb:4}}>

                <TextField
                    id="standard-basic"
                    label="Enter OrderId"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleInput(e)}
                    sx={{mr:2}}
                />
                <Button size='small' onClick={handleFetchOrderDetail}>Search</Button>
              </Box>

              {orderStatus!==null && orderStatus!==undefined ? (
                <>
                <Typography variant="subtitle1">
                    {message[orderStatus]}
                    <br />
                    Thank You.
                </Typography>
                <Button mt={2} sx={{mt:2}} variant="outlined" onClick={navigateHome}>
                    Go back to Home page
                </Button>
                </>
              ):
              orderStatus===undefined ? <Typography variant={'subtitle1'}>Please enter valid order number!</Typography>:
              null}
            </Paper>
            <Copyright />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
