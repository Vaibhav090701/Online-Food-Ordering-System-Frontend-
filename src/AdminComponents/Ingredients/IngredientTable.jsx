import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateFoodCategoryForm from '../FoodCategory/CreateFoodCategoryForm';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurent, updateStockOfIngredient } from '../../component/State/Ingredients/Action';

const orders=[1,1,1,1,1,1];
const IngredientTable = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
  };

  const dispatch=useDispatch();
  const { restaurent, ingredients } = useSelector(store => store);
  const restaurentId= restaurent.userRestaurent.id;
  const jwt=localStorage.getItem("jwt");


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
      dispatch(getIngredientsOfRestaurent(jwt))
  },[])  
  
  const handleUpdateStock=(id)=>{
    dispatch(updateStockOfIngredient({id, jwt}))

  }

  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            title={"Ingredients"}
            sx={{pt:2}}
            action={
                <IconButton onClick={handleOpen} aria-label="settings">
                  <CreateIcon />
                </IconButton>
            }
      
            />
        </Card>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Avaibility</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.quantityInStock}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>handleUpdateStock(row.id)}>{row.quantityInStock>0?"in_stock":"out_of_stock"}</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <CreateIngredientForm/>
  </Box>
    </Modal>

    </Box>
  )
}

export default IngredientTable;
