
import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
const CreateCategory = lazy(() => import('./CreateCategory'));
const Addproducts = lazy(() => import('./AddProducts'));

const AdminPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gap={50}
      p={2}
    >
      <Suspense fallback={<CircularProgress />}>
        <Box flex={1} maxWidth="600px" p={1}>
          <CreateCategory />
        </Box>
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <Box flex={1} maxWidth="600px" p={1}>
          <Addproducts />
        </Box>
      </Suspense>
    </Box>
  );
};

export default AdminPage;

