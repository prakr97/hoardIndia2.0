import React from "react";
import { Box, Grid, Modal, Paper, Stack } from "@mui/material";
import ActionAreaCard from "./Card";
import ResponsiveAppBar from "./NavBar";
import { Footer } from "./Footer";
import { Carousel } from "./Carousel";
import { useSelector } from "react-redux";
import { useTheme, useMediaQuery } from '@mui/material';
import './Dashboard.css'

const subBannerImg = [
  "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/fa7713be-6b33-4013-b276-ecb5da71fcf4._CR0%2C0%2C1920%2C640_SX1500_.png",
  "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/e77b85eb-e57f-4831-8637-dc3ca04b5cbf._CR0%2C0%2C1920%2C640_SX1500_.png",
  "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/fa7713be-6b33-4013-b276-ecb5da71fcf4._CR0%2C0%2C1920%2C640_SX1500_.png",
]

export const Dashboard = () => {
  const navState = useSelector(store=>store.nav)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper >
      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Carousel/>
        </Grid>

        <ResponsiveAppBar/>


        <Grid xs={12} md={12} lg={12} item mb={3}>
          <div style={{position:'relative'}}>
            <img
              alt=""
              src={subBannerImg[navState - 1]}
              className="img-subBanner"
            />
            { navState !== 2 && (
              <div className="content-block"> 
                  <h3 className="img-header" >Smart Night Light</h3>
                  <div className="img-desc" >
                    <p>Sense 'D' Light is a smart night light that auto turns on in the dark and off during the day.</p>
                  </div>
              </div>
            )}
          </div>
        </Grid>

        <Grid item sm={12} xs={12} md={11} mb={3} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <ActionAreaCard/>
        </Grid>

        <Grid xs={12} item md={11}><Footer isSmallScreen={isSmallScreen}/></Grid>
      </Grid>
        
    </Paper>
  );
};
