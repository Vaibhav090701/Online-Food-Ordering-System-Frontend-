import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../../component/State/Admin/Restaurent Orders/Action'; // Import the updateOrderStatus action
import { getRestaurantOrders } from '../../component/State/Order/Action';

const OrderTable = ({filterValue}) => {

  const dispatch = useDispatch();
  const { order, restaurent } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

    // State for pagination
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10); // Items per page
  

  useEffect(() => {
    dispatch(getRestaurantOrders({ status:filterValue, page:page, limit}));
  }, [dispatch, jwt, filterValue, page, limit]);

    // Function to handle page changes
    const handlePageChange = (event, newPage) => {  
      setPage(newPage);
    };
  
  // Function to update the order status
  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus(newStatus,orderId)); // Dispatch the action to update the status
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2 }}
        />
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Ingredients</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell> {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {order.restaurantOrders.content.map((order, index) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{order.userProfileDTO.email}</TableCell>
                <TableCell align="right">{order.totalAmount}</TableCell>
                <TableCell align="right">
                  {order.items.map((item, index) => (
                    <p key={index}>{item.itemName.name},</p>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {order.items.map((item, index) => (
                    <p key={index}>{item.itemName.ingredients.map((ingredient, i) => (
                      <span key={i}>{ingredient.name},</span>
                    ))}</p>
                  ))}
                </TableCell>
                <TableCell align="right">{order.status}</TableCell>  

                {/* Add the buttons for changing the status */}
                <TableCell align="right">
                  {order.status === 'PENDING' && (
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                    >
                      Mark as Completed
                    </Button>
                  )}

                  {order.status === 'COMPLETED' && (
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                    >
                      Mark as Delivered
                    </Button>
                  )}

                  {/* Disable buttons if order is delivered */}
                  {order.status === 'DELIVERED' && (
                    <Button 
                      variant="contained" 
                      color="default" 
                      disabled
                    >
                      Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

            {/* Pagination Controls */}
            <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={Math.ceil(10 / limit)} // Total pages
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>


    </Box>
  );
}

export default OrderTable;
