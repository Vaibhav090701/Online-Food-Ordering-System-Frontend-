import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CityAutocomplete = ({ formik }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length < 3) return;
    const fetchCities = async () => {
      setLoading(true);
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: inputValue,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
      });
      const cities = res.data
        .filter((item) => item.type === 'city' || item.class === 'place')
        .map((item) => item.display_name);
      setOptions(cities);
      setLoading(false);
    };

    const debounce = setTimeout(() => fetchCities(), 500);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={options}
      loading={loading}
      value={formik.values.city}
      onChange={(e, value) => formik.setFieldValue('city', value)}
      onInputChange={(e, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          sx={{
            backgroundColor: 'white',
            '& .MuiInputBase-root': { color: '#FF5722' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FF5722' },
            '& label': { color: '#FF5722' },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CityAutocomplete;
