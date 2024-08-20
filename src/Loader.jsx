import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loader = ({ loading }) => (
  <Backdrop open={loading} style={{ zIndex: 9999 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loader;
