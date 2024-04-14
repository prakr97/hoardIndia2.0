import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../store/addressSlice";
import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import { Autocomplete } from "@mui/material";

export default function AddressForm() {
  const [state, setState] = useState([''])
  const [city, setCity] = useState([''])
  const dispatch = useDispatch()
  const addressInfo = useSelector(store=>store.addressInfo)
  const handleInputChange = (key, value) => {
    dispatch(updateState({key:key, value:value}))
  }

  const fetchState = async () => {
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
        country: "India"
      });
  
      const filteredState = response.data?.data?.states?.map(state=>state.name)??['']
      setState(filteredState);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCities = async () => {
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: "India",
        state: addressInfo?.state.toLowerCase()
      });
  
      setCity(response.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchState()
  },[])

  useEffect(()=> {
    if(addressInfo?.state!==''){
      fetchCities()
    }
  },[addressInfo?.state])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="FullName"
            label="Full Name"
            fullWidth
            variant="standard"
            value={addressInfo?.name}
            onChange={(e)=>handleInputChange('name',e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            variant="standard"
            value={addressInfo?.address}
            onChange={(e)=>handleInputChange('address',e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Nearby Location"
            fullWidth
            variant="standard"
            value={addressInfo?.nearBy}
            onChange={(e)=>handleInputChange('nearBy',e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email Address"
            fullWidth
            variant="standard"
            value={addressInfo?.email}
            onChange={(e)=>handleInputChange('email',e.target.value)}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="standard"
            value={addressInfo?.phone}
            inputProps={{ maxLength: 10 }}
            onChange={(e)=>handleInputChange('phone',e.target.value)}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            options={state} 
            value={addressInfo?.state}
            onChange={(e)=>handleInputChange('state',e.target.textContent)}
            renderInput={(params) => <TextField {...params} label="State/Province/Region *" variant="standard" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            options={city} 
            value={addressInfo?.city}
            onChange={(e)=>handleInputChange('city',e.target.textContent)}
            renderInput={(params) => <TextField {...params} label="City *" variant="standard" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pincode"
            name="pincode"
            label="Pincode"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 6 }}
            value={addressInfo?.pincode}
            onChange={(e)=>handleInputChange('pincode',e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label=" "
            fullWidth
            variant="standard"
            value={"India"}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}
