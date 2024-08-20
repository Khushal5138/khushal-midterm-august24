import axios from 'axios';

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data?.message || 'Login failed' });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });

  try {
    const response = await axios.post('http://localhost:3000/api/v1/users', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response?.data?.message || 'Registration failed' });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};




// import axios from 'axios';

// export const loginUser = (userData) => async (dispatch) => {
//   dispatch({ type: 'LOGIN_REQUEST' });

//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
//     dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data?.message || 'Login failed' });
//   }
// };

// export const registerUser = (userData) => async (dispatch) => {
//   dispatch({ type: 'REGISTER_REQUEST' });

//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/users', userData);
//     dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'REGISTER_FAIL', payload: error.response?.data?.message || 'Registration failed' });
//   }
// };



// import axios from 'axios';

// export const loginUser = (userData) => async (dispatch) => {
//   dispatch({ type: 'LOGIN_REQUEST' });

//   try {
//     const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
//     dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data?.message || 'Login failed' });
//   }
// };


