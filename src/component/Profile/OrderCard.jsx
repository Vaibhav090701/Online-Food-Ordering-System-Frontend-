import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-5">
      {/* Order Header: Basic Info */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <Typography variant="h6" className="font-semibold text-gray-700">
            Order #{order.id}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" className={`text-sm ${order.status === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'}`}>
            Status: {order.status}
          </Typography>
        </div>
        <Typography variant="h6" className="font-bold text-gray-700">
          Total: ${order.totalAmount}
        </Typography>
      </div>

      {/* Expandable Order Items */}
      {isExpanded && (
        <div className="mb-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <img className="h-12 w-12 object-cover rounded" src={item.itemName.images[0]} alt={item.itemName.name} />
                <div>
                  <Typography variant="body1" className="font-medium text-gray-700">
                    {item.itemName.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    ${item.price} x {item.quantity}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expand/Collapse Button */}
      <Button 
        variant="outlined" 
        size="small" 
        onClick={toggleExpand} 
        className="mt-2 w-full"
      >
        {isExpanded ? 'Hide Details' : 'View Details'}
      </Button>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3">
        <Button variant="contained" color="primary" size="small">
          Reorder
        </Button>
        <Button variant="outlined" size="small" onClick={() => alert('Tracking Order')}>
          Track Order
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
