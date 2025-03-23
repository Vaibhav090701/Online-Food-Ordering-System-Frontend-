import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../State/Event/Action';

const Event = () => {
  const dispatch = useDispatch();
  const { event } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (event.events) {
      setAllEvents(event.events);
    }
  }, [event]);

  return (
    <div className='py-10 px-5'>
      <Grid container spacing={3}>
        {
          allEvents.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.eventId}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 3, boxShadow: 3, bgcolor: 'white' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl || 'default_image_url.jpg'} // Use a default image if no image exists
                  alt={item.eventName}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                  <Typography variant='h6' className="font-semibold text-gray-700">
                    {item.eventName}
                  </Typography>
                  <Typography className="font-semibold text-gray-700">
                    {item.location}
                  </Typography>
                  <Typography variant="body2"className="text-gray-500">
                    {`${new Date(item.startDate).toLocaleString()} - ${new Date(item.endDate).toLocaleString()}`}
                  </Typography>
                  <Button variant="contained" color="primary" size="small" sx={{ width: '100%' }}>
                    More Info
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default Event;
