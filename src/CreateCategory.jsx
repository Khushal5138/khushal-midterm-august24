
import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, Snackbar, Alert, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must be at most 500 characters"),
});

const CreateCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate('/');
  };

  return (
    <Box
      component="div"
      sx={{ maxWidth: 600, margin: '0 auto', mt: 5, p: 3, borderRadius: 2, boxShadow: 3, border: '1px solid', borderColor: 'grey.400' }}
    >
      <Typography variant="h5" gutterBottom>Create Category</Typography>
      <Formik
        initialValues={{ name: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setLoading(true);
          axios.post('http://localhost:3000/api/v1/categories', values)
            .then(() => {
              setSnackbarMessage('Category created successfully!');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
              setLoading(false);
              resetForm();
            })
            .catch(error => {
              setSnackbarMessage('Error creating category.');
              setSnackbarSeverity('error');
              setOpenSnackbar(true);
              setLoading(false);
              console.error('Error creating category:', error);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={StyledTextField}
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            <Field
              as={StyledTextField}
              label="Description"
              name="description"
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <ErrorMessage name="description" component="div" style={{ color: 'red' }} />
            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, padding: '6px 16px' }}
                disabled={isSubmitting || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, padding: '6px 16px' }}
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateCategory;
