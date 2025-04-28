import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurent} from '../../component/State/Ingredients/Action';
import { style } from '../../util/constants';
import UpdateIngredientForm from './UpdateIngredientForm';

const IngredientTable = () => {
  const dispatch = useDispatch();
  const { restaurent, ingredients } = useSelector(store => store);
  const restaurentId = restaurent.userRestaurent.id;
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false); // To control the form visibility
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setSelectedIngredient(null);
    setOpenEditForm(false);
  } 


  useEffect(() => {
    dispatch(getIngredientsOfRestaurent(jwt));
  }, []);

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  const handleEditIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenEditForm(true);

    // Set current ingredient to edit & open modal
  };

  const handleDeleteIngredient = (ingredientId) => {
    console.log("Delete ingredient with id:", ingredientId);
    // Trigger delete API call here
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"Ingredients"}
          sx={{ pt: 2 }}
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
              <TableCell align='left'>#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.ingredients.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.quantityInStock}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    color={row.quantityInStock > 0 ? "success" : "error"}
                    onClick={() => handleUpdateStock(row.id)}
                  >
                    {row.quantityInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditIngredient(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteIngredient(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>

      <Modal open={openEditForm} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
        {selectedIngredient && (
          <UpdateIngredientForm
           ingredient={selectedIngredient}
           handleClose={handleClose}
          />
        )}

        </Box>
      </Modal>

    </Box>
  );
};

export default IngredientTable;
