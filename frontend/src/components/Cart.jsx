import { Button, Paper } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { modify } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const cartState = useSelector(state=>state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePlus = (item) => {
    dispatch(modify({type:'plus', id:item.id}))
  }
  const handleMinus = (item) => {
    dispatch(modify({type:'minus', id:item.id}))
  }

  const handleBuyClick = () => {
    navigate('/checkout')
  }

  return (
    <div>
    <Paper elevation={3} sx={{maxHeight: 400, overflowY: 'auto'}}>
        {cartState?.map(item=>{
            return(
            <Card sx={{ display: 'flex', borderBottom: '1px solid grey' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100 }}
                    image={item?.img}
                    alt={item?.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent>
                    <Typography align="left" maxWidth={500}>
                        {item?.desc}
                    </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton aria-label="previous" onClick={() => handlePlus(item)}>
                        <AddIcon />
                    </IconButton>
                    <Typography component="div" variant="h5" color="text.secondary" margin={2}>
                        {item?.quantity}
                    </Typography>
                    <IconButton aria-label="next" onClick={() => handleMinus(item)}>
                        <RemoveIcon />
                    </IconButton>
                    </Box>
                </Box>
            </Card>
            )
        })}
    </Paper>
    <Box display={cartState.length>0?'flex':'none'} justifyContent={'center'} alignItems={'center'}>
    <Button style={{ marginTop: 15, width: 200,display:'flex', justifyContent:'center',alignItems:'center'}} variant="contained" onClick={()=>handleBuyClick()}>Buy All</Button>
    </Box>
    </div>
  )
}
