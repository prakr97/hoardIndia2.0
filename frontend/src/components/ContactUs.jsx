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
import { createInquiry, fetchSingleOrder } from "../services/orderServices";

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

export default function ContactUs() {
  const [name,setName]=useState('')
  const [phone, setPhone]=useState('')
  const [email, setEmail]=useState('')
  const [reason, setReason]=useState('')
  const [responseStatus, setResponseStatus]=useState(null)

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const navigateHome = () => {
    dispatch(updateNav({ value: 0 }));
    navigate("/");
  };

  const validate = (obj) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const regexMobile = /^[0-9]{10}$/;
  
    if (obj?.name.trim() === '') {
      toast.error('Please enter your full name');
      return false;
    } else if (regexMobile.test(obj?.phone.trim()) === false) {
        toast.error('Please enter a valid phone number');
        return false;
    } else if (regexEmail.test(obj?.email.trim()) === false) {
      toast.error('Please enter a valid email');
      return false;
    } else if (obj?.reason.trim() === '') {
        toast.error('Please enter your reason');
        return false;
    }
  
    // All validations passed
    return true;
  };

  const handleSubmit = async() => {
    try{
        const payload = {
            name:name, 
            phone:phone, 
            email:email,
            reason:reason,
        }
        const isValid = validate(payload)
        if(isValid===false) return

        const response = await createInquiry(payload)
        setResponseStatus(response?.data?.status)
        // setOrderStatus(response?.data?.status)
        console.log(response, '------response')
    }catch(err){
        console.log('Error while fetching order: ', err)
    }
  }



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
             {responseStatus===null && responseStatus!==1 && responseStatus!==0 && responseStatus!==undefined && <Box sx={{ mt:2}}>

                <Typography  variant="h5" align="left" sx={{mb:2}}>
                    Contact Us!
                </Typography>

                <TextField
                    id="standard-basic"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    sx={{mb:2}}
                />
                <TextField
                    id="standard-basic"
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{mb:2}}
                />
                <TextField
                    id="standard-basic"
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{mb:2}}
                />
                <TextField
                    id="standard-basic"
                    label="Reason"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => setReason(e.target.value)}
                    sx={{mb:2}}
                />
                <Button size='medium' variant="contained" sx={{display:'flex', justifyContent:'left'}} onClick={handleSubmit}>Submit</Button>
              </Box>}

              {responseStatus===1 ? (
                <>
                <Typography variant="subtitle1">
                    Your contact request has been submitted successfully. Rest assured we will contact you within 1-2 days.
                    <br />
                    Thank You.
                </Typography>
                <Button mt={2} sx={{mt:2}} variant="outlined" onClick={navigateHome}>
                    Go back to Home page
                </Button>
                </>
              ):
              responseStatus===0 || responseStatus===undefined ? <Typography variant={'subtitle1'}>Oops, an error occurred while submitting your contact request. Please resubmit the request or try again after sometime.</Typography>:
              null}
            </Paper>
            <Copyright />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
