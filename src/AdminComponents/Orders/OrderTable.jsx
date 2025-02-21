import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentOrders } from '../../component/State/Admin/Restaurent Orders/Action';

const orders=[1,1,1,1,1,1];
const OrderTable = () => {

  const dispatch=useDispatch();
  const {restaurent, menu}=useSelector(store => store)
  const jwt=localStorage.getItem("jwt");
  const restaurentId=restaurent.userRestaurent.id;
    
  useEffect(()=>{
    dispatch(getRestaurentOrders({restaurentId, jwt}))
  },[])

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            title={"All Orders"}  
            sx={{pt:2}}
            />
        </Card>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{"image"}</TableCell>
              <TableCell align="right">{"foodie@gmail.com"}</TableCell>
              <TableCell align="right">{"price"}</TableCell>
              <TableCell align="right">{"pizza"}</TableCell>
              <TableCell align="right">{"ingredients"}</TableCell>
              <TableCell align="right">{"completed"}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
  )
}

export default OrderTable



