

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';

// const Members = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = () => {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!user) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h6">No user logged in</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3} display="flex" justifyContent="center">
//       <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%' }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Welcome, {user.user.username}!
//         </Typography>
//         <Divider sx={{ mb: 2 }} />
//         <Box mb={2}>
//           <Typography variant="h6">User Details:</Typography>
//           <Typography><b>ID:</b> {user.user._id}</Typography>
//           <Typography><b>Username:</b> {user.user.username}</Typography>
//           <Typography><b>Email:</b> {user.user.email}</Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Members;


import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';

const Members = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No user logged in</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Welcome, {user.user.username}!
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box mb={2}>
          <Typography variant="h6">User Details:</Typography>
          <Typography><b>ID:</b> {user.user._id}</Typography>
          <Typography><b>Username:</b> {user.user.username}</Typography>
          <Typography><b>Email:</b> {user.user.email}</Typography>
          <Typography><b>Role:</b> {user.user.role}</Typography> 
        </Box>
      </Paper>
    </Box>
  );
};

export default Members;
