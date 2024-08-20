import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Members from './Members';
import AddProducts from './AddProducts'; 
import Register from './Register';
import CreateCategory from './CreateCategory';
import ShowProducts from './ShowProducts';
import AdminPage from './AdminPage';
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/create" element={<CreateCategory />} /> 
        <Route path="/admin" element={<AdminPage />} /> 
        <Route path="/members" element={<Members />} />
        <Route path="/" element={<ShowProducts />} /> 
      </Routes>
    </Router>
  );
}

export default App;
