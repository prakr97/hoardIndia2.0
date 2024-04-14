import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';


export default function Review() {
  const cartState = useSelector(state=>state.cart)
  const addressInfo = useSelector(state=>state.addressInfo)
  let totalCost = 0
  cartState?.forEach((item, index) => {
    totalCost+=(item.price)*(item.quantity)
  })


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartState?.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <img src={product?.img} alt="" style={{width:'70px', height:'70px', marginRight:'5px'}}/>
            <ListItemText primary={product.title} secondary={'Quantity: '+product?.quantity} />
            <Typography variant="body2" >{'₹'+((product.price)*(product.quantity).toString())}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {'₹'+totalCost.toString()}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Payment Type" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {'Cash On Delivery(COD)'}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          {/* <ListItemText primary="Payment Type" /> */}
          <Typography variant="caption" color={'grey'}sx={{ fontWeight: 700 }}>
            {'Items are returnable for manufacturing defects within a 10-day period. T&C*'}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Details
          </Typography>
          <Typography gutterBottom>{addressInfo?.name}</Typography>
          <Typography gutterBottom>{addressInfo?.address}</Typography>
          <Typography gutterBottom>{addressInfo?.nearBy}</Typography>
          <Typography gutterBottom>{`${addressInfo?.city}, ${addressInfo?.state} - ${addressInfo?.pincode}`}</Typography>
          <Typography gutterBottom>{addressInfo?.phone}</Typography>
          <Typography gutterBottom>{addressInfo?.email}</Typography>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}