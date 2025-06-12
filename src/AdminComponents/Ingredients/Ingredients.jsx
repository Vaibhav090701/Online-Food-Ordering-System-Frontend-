import React from 'react'
import IngredientTable from './IngredientTable'
import { Grid } from '@mui/material'

const Ingredients = () => {
  return (
    <div className='px-2'>
      <Grid container spacing={3}>
        <Grid item xs={6} lg={8}>
          <IngredientTable/>
        </Grid>

      </Grid>
    </div>
  )
}

export default Ingredients
