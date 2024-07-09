"use client";
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, createTheme, ThemeProvider, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const CarSubmit = () => {
  const [carModel, setCarModel] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    carModel: false,
    price: false,
    phone: false,
    city: false,
    maxPictures: false,
  });

  const handlePictureChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (pictures.length + selectedFiles.length > maxPictures) {
      setError(`You can upload a maximum of ${maxPictures} pictures.`);
      return;
    }

    setPictures([...pictures, ...selectedFiles]);
    setError('');
  };

  const handleRemovePicture = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
    setError('');
  };

  const handleIncrementMaxPictures = () => {
    if (maxPictures < 10) {
      setMaxPictures(maxPictures + 1);
    }
  };

  const handleDecrementMaxPictures = () => {
    if (maxPictures > 1) {
      setMaxPictures(maxPictures - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      setFormErrors({
        ...formErrors,
        phone: true,
      });
      setError('Phone number must be 11 digits.');
      return;
    }

    if (!carModel || !price || !phone || !city || maxPictures < 1 || maxPictures > 10) {
      setFormErrors({
        carModel: !carModel,
        price: !price,
        phone: !phone,
        city: !city,
        maxPictures: (maxPictures < 1 || maxPictures > 10),
      });
      setError('Please fill in all required fields correctly.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('carModel', carModel);
      formData.append('price', price);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('maxPictures', maxPictures);
      for (let i = 0; i < pictures.length; i++) {
        formData.append('pictures', pictures[i]);
      }

      const token = localStorage.getItem('token'); // Assume token is stored in local storage
      await axios.post('http://localhost:5000/api/cars', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarModel('');
      setPrice('');
      setPhone('');
      setCity('');
      setMaxPictures(1);
      setPictures([]);
      setError('');
      setFormErrors({
        carModel: false,
        price: false,
        phone: false,
        city: false,
        maxPictures: false,
      });
    } catch (err) {
      setError('Failed to submit');
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#FF5722',
      },
      error: {
        main: '#f44336',
      },
      background: {
        default: '#f9f9f9',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box sx={{ px: 4, py: 4, bgcolor: 'background.default', boxShadow: '0px 4px 16px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
            Submit Car Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Car Model"
              variant="outlined"
              margin="normal"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              error={formErrors.carModel}
              helperText={formErrors.carModel && 'Car Model is required'}
              required
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              margin="normal"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={formErrors.price}
              helperText={formErrors.price && 'Price is required'}
              required
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={formErrors.phone}
              helperText={formErrors.phone && 'Phone number must be 11 digits'}
              required
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={formErrors.city}
              helperText={formErrors.city && 'City is required'}
              required
            />
            <TextField
              fullWidth
              label="Max Pictures"
              variant="outlined"
              margin="normal"
              type="number"
              inputProps={{ min: 1, max: 10 }}
              value={maxPictures}
              onChange={(e) => setMaxPictures(e.target.value)}
              required
              error={formErrors.maxPictures}
              helperText={formErrors.maxPictures && 'Max Pictures must be between 1 and 10'}
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePictureChange}
              max={maxPictures}
            />
            <Grid container spacing={2} my={2}>
              {pictures.map((picture, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      sx={{ position: 'absolute', top: 4, right: 4, color: '#f44336' }}
                      onClick={() => handleRemovePicture(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <img src={URL.createObjectURL(picture)} alt="preview" style={{ width: '100%' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" size="large">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CarSubmit;
