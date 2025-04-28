export const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Ahmedabad",
    "Kolkata",
  ];

export const cuisineTypes=[
    "Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Thai",
]

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%', // mobile
    sm: '70%', // tablets
    md: 400    // desktops
  },
  bgcolor: '#1f2937',
  outline:"none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // ✅ Added border radius (2 = 16px by default in MUI)
  // Typography Color
  '& .MuiTypography-root': {
    color: '#ffffff', // Set default text color for all Typography components inside Box
  },

    // Adding styles to ensure text visibility in input fields
    '& .MuiInputLabel-root': {
      color: '#ffffff', // Change label color to black
    },
    '& .MuiInputBase-root': {
      color: '#ffffff', // Change input text color to black
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff', // Change border color of text fields
      },
      '&:hover fieldset': {
        borderColor: '#ffffff', // Change border color when the field is focused
      },
    },
     // Style for MenuItem inside Select dropdown
  '& .MuiMenuItem-root': {
    backgroundColor: '##1f2937', // Set background color to black
    color: '#ffffff', // Set text color to white for contrast
    '&:hover': {
      backgroundColor: '#333', // Darker background when hovering over an option
    }
  },

    // Style for Select dropdown menu background
    '& .MuiMenu-paper': {
      backgroundColor: '#1f2937', // Set the background of the dropdown to black
      color: '#ffffff', // Set text color inside the dropdown to white
    },
    
    '& .MuiPickersPopper-root': {
      backgroundColor: '#1f2937',
      color: '#ffffff',
    },
    '& .MuiPickersDay-root': {
      color: '#ffffff',
    },
    '& .MuiPickersDay-root.Mui-selected': {
      backgroundColor: '#1f2937',
      color: '#ffffff',
    },
  
};

export const restaurantInitialValues = {
  name: "",
  description: "",
  address: "",
  city: "",
  phone: "",
  email: "",
  twitter: "",
  instagram: "",
  cuisineType: "",
  images: [],
};


  