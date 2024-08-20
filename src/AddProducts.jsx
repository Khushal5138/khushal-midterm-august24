

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, MenuItem, TextField, Typography, CircularProgress, styled } from '@mui/material';

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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: '6px 16px',
}));

const GenerateCodeButton = styled(StyledButton)(({ theme }) => ({
  marginTop: theme.spacing(1), // Adjust this value to shift the button up or down
  marginLeft: theme.spacing(2),
}));

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(30, "Product name must be at most 30 characters"),
  code: Yup.string().required("Product code is required"),
  excerpt: Yup.string()
    .required("Product description is required")
    .min(30, "Description must be at least 30 characters")
    .max(500, "Description must be at most 500 characters"),
  category: Yup.string().nullable(),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .max(100000, "Price cannot exceed 100,000"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

const generateCode = () => {
  const uuid = uuidv4();
  return uuid.slice(0, 6);
};

const Addproducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        alert("Server is not responding. Please try again later.");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={3} maxWidth="600px" mx="auto" sx={{ border: '1px solid', borderColor: 'grey.400', borderRadius: 2, boxShadow: 3, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Add Products</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <Formik
          initialValues={{
            name: "",
            code: "",
            excerpt: "",
            category: "",
            price: "",
            stock: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            axios
              .post("http://localhost:3000/api/v1/products", values)
              .then((response) => {
                console.log(response);
                navigate('/');
                resetForm();
              })
              .catch((err) => {
                console.log(err);
                alert("Error adding product. Please try again.");
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={StyledTextField}
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  name="name"
                />
                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mb={2} display="flex" alignItems="center">
                <Field
                  as={StyledTextField}
                  fullWidth
                  label="Product Code"
                  variant="outlined"
                  name="code"
                />
                <GenerateCodeButton
                  textAlign='center'
                  variant="contained"
                  onClick={() => setFieldValue("code", generateCode())}
                >
                  Generate Code
                </GenerateCodeButton>
                <ErrorMessage name="code" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mb={2}>
                <Field
                  as={StyledTextField}
                  fullWidth
                  label="Description"
                  variant="outlined"
                  name="excerpt"
                  multiline
                  rows={4}
                />
                <ErrorMessage name="excerpt" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mb={2}>
                <Field
                  as={StyledTextField}
                  select
                  fullWidth
                  label="Category"
                  name="category"
                >
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mb={2}>
                <Field
                  as={StyledTextField}
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  name="price"
                />
                <ErrorMessage name="price" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mb={2}>
                <Field
                  as={StyledTextField}
                  fullWidth
                  label="Stock"
                  variant="outlined"
                  type="number"
                  name="stock"
                />
                <ErrorMessage name="stock" component="div" style={{ color: 'red' }} />
              </Box>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
              </StyledButton>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default Addproducts;
