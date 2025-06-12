// import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import CreateIcon from '@mui/icons-material/Create';
// import CreateIngredientForm from './CreateIngredientForm';
// import { useDispatch, useSelector } from 'react-redux';
// import { getIngredientCategory } from '../../component/State/Ingredients/Action';
// import { style } from '../../util/constants';


// const IngredientCategoryTable = () => {

//   const dispatch=useDispatch();
//   const { restaurent, ingredients } = useSelector(store => store);
//   const restaurentId= restaurent.userRestaurent.id;
//   const jwt=localStorage.getItem("jwt");


//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(()=>{
//     dispatch(getIngredientCategory({id:restaurentId, jwt}))

//   },[])  
  
//   return (
//     <Box sx={style}>
//         <Card className='mt-1'>
//             <CardHeader
//             title={"Ingredient Category"}
//             sx={{pt:2}}
//             action={
//                 <IconButton onClick={handleOpen} aria-label="settings">
//                   <CreateIcon  />
//                 </IconButton>
//             }
      
//             />
//         </Card>

//         <TableContainer component={Paper}>
//       <Table aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Id</TableCell>
//             <TableCell align="left">Name</TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {ingredients.category.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.id}
//               </TableCell>
//               <TableCell align="left">{row.name}</TableCell>

//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

//     <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
//   <Box sx={style}>
//     <CreateIngredientCategoryForm/>
//   </Box>
//     </Modal>



    

//     </Box>
//   )
// }

// export default IngredientCategoryTable;
