import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Container,
  Snackbar,
  InputAdornment,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { BASE_URL } from '../config';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageLink: '',
    price: '',
    isPublished: 'false',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/admin/courses`,
        {
          ...formData,
          price: parseFloat(formData.price),
          published: formData.isPublished === 'true',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: 'Course added successfully!',
        severity: 'success',
      });
      setFormData({
        title: '',
        description: '',
        imageLink: '',
        price: '',
        isPublished: 'false',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add course. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
    }}>
      <Card sx={{ display: 'flex', width: '100%', maxWidth: 1000 }}>
        <Box sx={{ 
          width: '40%', 
          backgroundImage: 'url("https://meponlinecourses.com/wp-content/uploads/2023/03/header-image.png")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} />
        <CardContent sx={{ width: '60%', padding: 3 }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Add New Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  label="Course Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  label="Course Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="imageLink"
                  required
                  fullWidth
                  label="Cover Image URL"
                  value={formData.imageLink}
                  onChange={handleChange}
                />
              </Grid>
              {formData.imageLink && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 150,
                      backgroundImage: `url(${formData.imageLink})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 1,
                      marginBottom: 2,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  required
                  fullWidth
                  label="Price"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="isPublished-label">Published</InputLabel>
                  <Select
                    labelId="isPublished-label"
                    name="isPublished"
                    value={formData.isPublished}
                    onChange={handleChange}
                    label="Published"
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#a435f0',
                '&:hover': {
                  backgroundColor: '#5624d0',
                },
              }}
            >
              Add Course
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddCourse;