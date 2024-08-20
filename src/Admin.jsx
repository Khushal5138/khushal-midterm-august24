import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const OrderList = ({ orders, onSelectOrder }) => (
  <div className="OrderList">
    <h2>Orders</h2>
    <ul>
      {orders.map(order => (
        <li key={order._id}>
          <div>Order Name: {order.serial}</div>
          <div>Total: ${order.total}</div>
          <button onClick={() => onSelectOrder(order._id)}>Details</button>
        </li>
      ))}
    </ul>
  </div>
);

const OrderDetails = ({ order, onDelete }) => (
  <div className="OrderDetailsPage">
    <h2>Order Details</h2>
    <h3>Order Name: {order.serial}</h3>
    <ul>
      {order.orderItems.map(item => (
        <li key={item._id}>
          <div>Product Name: {item.product.name}</div>
          <div>Product Price: ${item.product.price}</div>
          <div>Product Quantity: {item.qty}</div>
        </li>
      ))}
    </ul>
    <button onClick={() => onDelete(order._id)}>Delete Order</button>
  </div>
);

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/orders')
      .then(response => {
        setOrders(response.data.orders);
        setLoading(false);
        if (orderId) {
          const order = response.data.orders.find(order => order._id === orderId);
          setSelectedOrder(order);
        }
      })
      .catch(error => {
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, [orderId]);

  const handleSelectOrder = (id) => {
    navigate(`/admin/${id}`);
  };

  const handleDeleteOrder = (id) => {
    axios.delete(`http://localhost:3000/api/v1/orders/${id}`)
      .then(() => {
        setOrders(orders.filter(order => order._id !== id));
        setSelectedOrder(null);
        navigate('/AdminPage');
      })
      .catch(() => {
        setError('Failed to delete the order');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="AdminPage">
      <OrderList orders={orders} onSelectOrder={handleSelectOrder} />
      {selectedOrder && <OrderDetails order={selectedOrder} onDelete={handleDeleteOrder} />}
      
    </div>
  );
};

export default AdminPage;