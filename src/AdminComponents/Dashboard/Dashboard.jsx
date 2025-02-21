import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateRestaurentStatus } from '../../component/State/Restaurent/Action';

const AdminDashboard = () => {
  const { restaurent } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleRestaurentStatus = () => {
    dispatch(updateRestaurentStatus({
      restaurentId: restaurent.userRestaurent.id,
      jwt: localStorage.getItem("jwt")
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Grid container spacing={4}>
        {/* Restaurant Overview Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Restaurant Status" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <Typography variant="h6">{restaurent.userRestaurent?.open ? "Open" : "Closed"}</Typography>
              <Button
                variant="contained"
                color={restaurent.userRestaurent?.open ? "error" : "primary"}
                fullWidth
                onClick={handleRestaurentStatus}
              >
                {restaurent.userRestaurent?.open ? "Close" : "Open"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue and Orders */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Total Revenue" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <Typography variant="h5">$1234.56</Typography>
              <Typography variant="body2">This Month</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Recent Orders" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <Box>
                <Typography variant="body1">Order #12345</Typography>
                <Typography variant="body2">Pending</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Analytics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Sales Analytics" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              {/* Placeholder for graph/chart */}
              <Typography variant="body2">Chart showing trends...</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Sections */}
      <Grid container spacing={4} className="mt-8">
        {/* Menu Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Menu Management" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <Button variant="contained" color="primary" fullWidth>Manage Menu</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Reservation Management */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1c1c1c', borderRadius: '8px' }}>
            <CardHeader title="Reservations" sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <Button variant="contained" color="primary" fullWidth>Manage Reservations</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
