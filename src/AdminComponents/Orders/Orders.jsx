import React, { useState } from 'react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import OrderTable from './OrderTable';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "DELIVERED" },
  { label: "All", value: "ALL" }
];

const Orders = () => {
  // Initialize filterValue with "ALL" to ensure that at least one option is selected by default
  const [filterValue, setFilterValue] = useState();


  // Correct event handler for RadioGroup
  const handleFilter = (e,value) => {
    // event.target.value contains the value of the selected radio button
    console.log("filtered values", e.target.value);
    
    setFilterValue(value);
  };

  return (
    <div className='p-2'>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>Order Status</Typography>

        <FormControl>
          <RadioGroup
            row
            name="category"
            value={filterValue || "ALL"}
            onChange={handleFilter}
          >
            {
              orderStatus.map((item) => (
                <FormControlLabel
                  key={item.value} // Ensure 'key' is unique
                  value={item.value}
                  control={<Radio />}
                  sx={{ color: "gray" }}
                  label={item.label}
                />
              ))
            }
          </RadioGroup>
        </FormControl>
      </Card>

      <OrderTable filterValue={filterValue}/>
    </div>
  );
};

export default Orders;
