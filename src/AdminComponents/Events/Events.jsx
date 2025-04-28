import { Box, Button, Grid, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, GlobalStyles } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getRestaurentsEvents, deleteEvents } from '../../component/State/Event/Action';
import dayjs from 'dayjs';
import { style } from '../../util/constants';


const Events = () => {
  const initialValues = {
    imageUrl: '',
    location: '',
    eventName: '',
    startDate: null,
    endDate: null,
  };


  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  const { restaurent, event } = useSelector(store => store);
  const dispatch = useDispatch();

  const id = restaurent.userRestaurent.id;
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getRestaurentsEvents({ restaurentId: id, jwt }));
  }, [dispatch, id, jwt]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormValues(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      imageUrl: formValues.imageUrl,
      location: formValues.location,
      eventName: formValues.eventName,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      restaurentId: id,
    };

    if (isEditing) {
      // Edit event logic
      // dispatch(createEvent({ data: values, jwt, eventId: currentEventId }));
    } else {
      // Create event logic
      dispatch(createEvent({ data: values, jwt }));
    }
    
    setFormValues(initialValues);
    handleClose();
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  const handleDelete = (eventId) => {
    dispatch(deleteEvents({ eventId, jwt }));
  };

  const handleEdit = (eventId) => {
    const eventToEdit = event.restaurentEvents.find(ev => ev.id === eventId);
    setFormValues({
      imageUrl: eventToEdit.imageUrl,
      location: eventToEdit.location,
      eventName: eventToEdit.eventName,
      startDate: dayjs(eventToEdit.startDate), // Convert to Dayjs object
      endDate: dayjs(eventToEdit.endDate),     // Convert to Dayjs object
      });
    setIsEditing(true);
    setCurrentEventId(eventId);
    handleOpen();
  };

  return (
    <div className="p-4">
      <Button onClick={handleOpen} variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Create Event
      </Button>

      {/* Event Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event.restaurentEvents && event.restaurentEvents.length > 0 ? (
              event.restaurentEvents.map((ev) => (
                <TableRow key={ev.id}>
                  <TableCell component="th" scope="row">
                    <Avatar src={ev.imageUrl}></Avatar>
                  </TableCell>

                  <TableCell>{ev.eventName}</TableCell>
                  <TableCell>{ev.location}</TableCell>
                  <TableCell>{new Date(ev.startDate).toLocaleString()}</TableCell>
                  <TableCell>{new Date(ev.endDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEdit(ev.eventId)} 
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDelete(ev.eventId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6">No events found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Creating/Editing Events */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="image"
                  name="imageUrl"
                  label="Image URL"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.imageUrl}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.location}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="eventName"
                  label="Event Name"
                  variant="outlined"
                  onChange={handleFormChange}
                  value={formValues.eventName}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formValues.startDate}
                    onChange={(newValue) => handleDateChange(newValue, 'startDate')}
                    inputFormat="MM-DD-YYYY hh:mm A"
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endDate}
                    onChange={(newValue) => handleDateChange(newValue, 'endDate')}
                    inputFormat="MM-DD-YYYY hh:mm A"
                    sx={{ width: '100%', backgroundColor: 'white', color:'black' }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {isEditing ? 'Update Event' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
