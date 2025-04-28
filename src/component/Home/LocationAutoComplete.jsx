import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LocationAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      if (inputValue.length < 3) return;
      setLoading(true);
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: inputValue,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
      });
      setOptions(response.data.map((place) => place.display_name));
      setLoading(false);
    };

    const delayDebounce = setTimeout(() => {
      fetchLocations();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      onInputChange={(event, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter Your Location"
          variant="outlined"
          sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            '& .MuiInputBase-root': {
              color: '#FF5722', // input text color
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF5722',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF5722',
            },
            '& label': {
              color: '#FF5722',
            },
            '& label.Mui-focused': {
              color: '#FF5722',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF5722',
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
export default LocationAutocomplete;
