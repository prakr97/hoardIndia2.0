import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const carouselObj = [
  {
    id: 1,
    img: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/916b14cd-7379-4c83-a60e-e4dbd5f4ba42._CR0%2C0%2C3000%2C600_SX1500_.png",
  },
  {
    id: 2,
    img: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/68da4c44-b4b7-4282-95f1-e548ab110680._CR0%2C0%2C3000%2C600_SX1500_.png",
  },
];

const bannerImg = [
  "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/916b14cd-7379-4c83-a60e-e4dbd5f4ba42._CR0%2C0%2C3000%2C600_SX1500_.png",
  'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/68da4c44-b4b7-4282-95f1-e548ab110680._CR0%2C0%2C3000%2C600_SX1500_.png',
  "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/916b14cd-7379-4c83-a60e-e4dbd5f4ba42._CR0%2C0%2C3000%2C600_SX1500_.png",
]

export const Carousel = () => {
  const navState = useSelector(store=>store.nav)
  const settings = {
    // dots: false,
    // rewind: true,
    // pagination: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    width: 100,
    // slidesToScroll: 1,
  };

  return (
    <>
      {/* <Grid item> */}
        {/* <Slider {...settings}> */}
          <div>
            <img
              alt=""
              src={bannerImg[navState-1]}
              style={{ maxWidth: '100%', height: 'auto', display: 'block' }}            />
          </div>
          {/* <div>
            <img
              alt=""
              src={"https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/916b14cd-7379-4c83-a60e-e4dbd5f4ba42._CR0%2C0%2C3000%2C600_SX1500_.png"}
              sizes="(max-width: 840px) 100vw,(max-width: 1500px) 100vw,1500px"
            />
          </div> */}
          {/* {carouselObj?.map((obj) => {
            return (
              <div>
                <img
                  alt=""
                  src={obj?.img}
                //   sizes="(max-width: 840px) 100vw,(max-width: 1500px) 100vw,1500px"
                />
              </div>
            );
          })} */}
        {/* </Slider> */}
      {/* </Grid> */}
    </>
  );
};
