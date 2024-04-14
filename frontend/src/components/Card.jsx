import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Grid, Rating } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux'
import { addNew, modify } from '../store/cartSlice';
import { cardObject, divineCardObject, smilyCardObject } from '../assets/storeItems';
import { useState } from 'react';
import { useEffect } from 'react';

const color = ['#318AD3', '#B39419', '#8BCF63']

function truncateDescription(description, maxLength=100) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }

export default function ActionAreaCard() {
    const cartState = useSelector(state=>state.cart)
    const navState = useSelector(state=>state.nav)
    const [cardObjDisplay, setCardObjDisplay] = useState(cardObject)
    const dispatch = useDispatch();

    const handleItemAdd = async(obj) => {
        console.log(obj, 'obj')
        let itemPresentInCart = false
        cartState.map(item=>{
            if(item.id===obj.id) itemPresentInCart = true
        })
        if(itemPresentInCart===true){
            dispatch(modify({type:'plus',id:obj.id}))
        }else{
            dispatch(addNew(obj))
        }
    }

    const handleCardToDisplay = () => {
        if(navState===1) setCardObjDisplay(cardObject)
        else if(navState===2) setCardObjDisplay(smilyCardObject)
        else if(navState===3) setCardObjDisplay(divineCardObject)
    }

    useEffect(()=> {
        if(navState)
        handleCardToDisplay()
    },[navState])
  
  return (
    <Grid container sm={12} xs={12} md={10} spacing={1} mb={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {cardObjDisplay?.map((obj,i)=>{
            return(
            <Grid item key={i} xs={6} md={3} mb={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Card  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={obj?.img}
                        alt="green iguana"
                    />
                    <CardContent sx={{ flex: '1 0 auto', minHeight:50}}>
                        <Typography variant="body2" color="text.secondary" align='left'>
                            {truncateDescription(obj?.desc)}
                        </Typography>
                        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} marginTop={1}>
                            <Rating size="small" name="half-rating-read" defaultValue={4} precision={4} readOnly />
                            <Typography sx={{ ml: 2 }} fontSize={12}>5402</Typography>
                        </Box>
                        <Typography variant="subtitle1" fontWeight={'bold'} align='left'>
                            ₹269
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align='left'>
                            M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹400</span> (33% off)
                        </Typography>
            
                        <Button style={{ marginTop: 15, width: {sx:130, md:200},alignItems:'center', backgroundColor:color[navState-1]}} variant="contained" onClick={()=>handleItemAdd(obj)}>Add to Cart</Button>
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            )
        })}
    </Grid>
  );
}