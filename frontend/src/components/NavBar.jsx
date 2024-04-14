import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Modal } from '@mui/material';
import { Cart } from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { updateNav } from '../store/navSlice';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'Smiley', 'Divine'];
const color = ['#6BA7C7', '#F3D068', '#8BCF63']

function ResponsiveAppBar(maxWidth=1550) {
  const cartState = useSelector(state=>state.cart)
  const navState = useSelector(state=>state.nav)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOpen = () => {
    const index = 5
    if(cartState.length>0){
      setOpen(true)
      handleNavClick(index,true)
    }
  };  
  const handleClose = () => setOpen(false);

  const handleNavClick = (page,isCart=false) => {
    let index
    if(isCart){
      index=page //page type is number
    }else{
      index = pages.indexOf(page) //page type is string
    }
    dispatch(updateNav({value: index+1}))
    navigate('/')
  }

  const handleSubNavClick = (index) => {
    dispatch(updateNav({value:index}))
    if(index===7) navigate('/trackOrder')
    else if(index===8) navigate('/contactUs')
  }
  console.log(navState,'-------navState')

  return (
    <>
    <AppBar elevation={0}  position="sticky" color={'grey'}>
      <Container className="classAB" style={{margin:'auto', maxWidth: 1550}}>
        <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-arround', alignItems: 'center', mb:0, pb:0}}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', mb:0, pb:0 } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={()=>handleNavClick(page)}
                sx={{ my: 2, color: 'white', display: 'block', border: navState===index+1? `3px solid ${color[index]}`:"none" }}
              >
                <span style={{color: 'black'}}>{page}</span>
              </Button>
            ))}
          </Box>
          <Box sx={{ position: 'relative', mb:0, pb:0 }}>
            <IconButton aria-label="previous" onClick={handleOpen}>
              <Badge badgeContent={cartState.length} color="primary">
                <ShoppingCartIcon color="action"/>
              </Badge>
            </IconButton>
            <div style={{ position: 'absolute', width: '100%', bottom: '-3px', borderBottom: navState===6? '2px solid #6BA7C7' : 'none' }} />
          </Box>
        </Toolbar>
        <Button size='small' onClick={()=>handleSubNavClick(7)} sx={{margin:0, padding:0, mr:2, color:'grey',  textDecoration: navState===7 ? 'underline' : 'none',textDecorationColor: 'blue'}}>Track your order</Button>
        <Button size='small' onClick={()=>handleSubNavClick(8)} sx={{margin:0, padding:0,color:'grey',textDecoration: navState===8 ? 'underline' : 'none',textDecorationColor: 'blue'}}>Contact Us</Button>
      </Container>
    </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display:'flex', justifyContent:'center', alignItems: 'center'}}
        >
        <Box sx={{maxHeight: 500, width:800, backgroundColor:'white', padding:5, borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center',  justifyContent:'center'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color='text.secondary' mb={2}>
          {`Your Cart ${cartState.length > 0 ? '' : 'Is Empty!'}`}
            {/* {`Your Cart`} */}
          </Typography>
          <Cart/>
        </Box>
      </Modal>
    </>
  );
}
export default ResponsiveAppBar;