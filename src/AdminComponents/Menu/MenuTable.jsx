import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, getMenuItemByRestaurantId, updateMenuItemsAvailability } from '../../component/State/Menu/Action';

const MenuTable = () => {

  const dispatch=useDispatch();
  const {restaurent, menu}=useSelector(store => store)
  const { menuItems, ingredients, loading, error } = useSelector(state => state.menu);
  const jwt=localStorage.getItem("jwt");
  const restaurentId=restaurent.userRestaurent.id;

  const navigate=useNavigate();

  const handleNavigate=()=>{
    navigate('/admin/restaurants/menu/categories')

  }
 
  const handleAvailability=(id)=>{
    dispatch(updateMenuItemsAvailability({foodId:id, restaurantId:restaurentId}))
  }

  const handleDelete=(id)=>{
    dispatch(deleteMenuItem({ id, restaurentId }))
    .then(() => {
      // After deletion, fetch the updated menu
      dispatch(getMenuItemByRestaurantId({restaurantId:restaurentId }));
    })

  }

  useEffect(()=>{
      dispatch(getMenuItemByRestaurantId({restaurantId:restaurentId}));
  },[])

  console.log("Menu", menu.menuItems);
  

  return (
    <Box>
      {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        <Card className='mt-1'>
            <CardHeader
            title={"Menu"}
            sx={{pt:2}}
            action={
                <IconButton onClick={handleNavigate} aria-label="settings">
                  <CreateIcon />
                </IconButton>
            }
      
            />
        </Card>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Avaibility</TableCell>
            <TableCell align="right">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {menu.menuItems.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={Array.isArray(row.images) && row.images.length > 0 ? row.images[0] : ''}></Avatar>
              </TableCell>
              <TableCell align="right">
              {row.name}
              </TableCell>
              <TableCell align="right">{row.ingredients.map((item)=>(
                <Chip label={item.name}></Chip>

              ))}
                </TableCell>
              <TableCell align="right">₹{row.price}</TableCell>
              <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    color={row.available ? "success" : "error"}
                    onClick={() => handleAvailability(row.id)}
                  >
                    {row.available? "In Stock" : "Out of Stock"}
                  </Button>
                </TableCell>
              <TableCell align="right">
                <Button onClick={()=>handleDelete(row.id)}>
                <DeleteIcon sx={{color:'red'}}/>
                </Button>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
  )
}

export default MenuTable
