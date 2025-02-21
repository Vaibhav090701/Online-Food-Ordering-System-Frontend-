import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, getMenuItemByRestaurentId, getRestaurentMenu, updateMenuItemsAvailability } from '../../component/State/Menu/Action';
import { restaurentOrderReducer } from '../../component/State/Admin/Restaurent Orders/Reducer';

const MenuTable = () => {

  const dispatch=useDispatch();
  const {restaurent, menu}=useSelector(store => store)
  const jwt=localStorage.getItem("jwt");
  const restaurentId=restaurent.userRestaurent.id;

  const navigate=useNavigate();

  const handleNavigate=()=>{
    navigate('/admin/restaurents/add-menu')

  }
 
  const handleAvailability=(id)=>{
    dispatch(updateMenuItemsAvailability({foodId:id, jwt}))
  }

  const handleDelete=(id)=>{
    dispatch(deleteMenuItem({foodId:id, jwt}))  
    .then(() => {
      // After deletion, fetch the updated menu
      dispatch(getRestaurentMenu({ id: restaurentId, jwt }));
    })

  }

  useEffect(()=>{
    dispatch(getRestaurentMenu({id:restaurentId, jwt}))
  },[])

  console.log("Menu", menu.menuItems);
  

  return (
    <Box>
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
                <Avatar src={row.images[0]}></Avatar>
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
                <Button onClick={()=>handleAvailability(row.id)} >
                {row.available?"in_stock":"out_of_stock"}
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
