import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateNav } from "../store/navSlice";

export const Footer = ({isSmallScreen}) => {
  const dispatch = useDispatch()
  
  const handleClick =()=>{
    dispatch(updateNav({value: 2}))
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={10} lg={10}> 
        <Card onClick={handleClick} elevation={0} sx={{ cursor:'pointer',display: "flex", flexDirection: {xs: "column",sm: "column", md: "row", }, justifyContent: 'center', alignItems: 'center' }}>
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} md={6} lg={6}>
              <CardMedia

                component="img"
                sx={{ maxWidth: '100%', height: 'auto' }} 
                image="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c26ddf68-7171-401c-80ca-c707e9e4026a._CR0%2C0%2C1200%2C628_SX750_SY375_.png"
                alt="Live from space album cover"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
              <CardContent > 
                  <Typography variant={isSmallScreen? "subtitle1": 'h6'} align="center">Introducing our Smiley Plug Night Lamp! It's cute, <br />compact, and super easy to use. Just plug it into any <br />outlet and enjoy its warm, comforting glow.</Typography>
                  <Typography paddingTop={2} variant={isSmallScreen? "h5": 'h5'} fontWeight="bold" align="center">Shop now</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
