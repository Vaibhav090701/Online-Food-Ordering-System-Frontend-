import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentsCategory } from '../../component/State/Restaurent/Action';
import { getRestaurentOrders } from '../../component/State/Admin/Restaurent Orders/Action';

const orders=[1,1,1,1,1,1];

const FoodCategoryTable = () => {

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

  const { restaurent } = useSelector(store => store);
  const dispatch=useDispatch();

  const jwt=localStorage.getItem("jwt");

  console.log("Restaurent Details", restaurent);

    useEffect(()=>{
      dispatch(getRestaurentsCategory({restaurentId:restaurent.userRestaurent?.id, jwt}))
  
    },[])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (

  
    <Box>
        <Card className='mt-1'>
            <CardHeader
            title={"Food Category"}
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
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {restaurent.categories.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>

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
    <CreateFoodCategoryForm/>
  </Box>
    </Modal>

    </Box>
    
  )
}

export default FoodCategoryTable;
