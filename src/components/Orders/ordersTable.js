import { array, string } from 'prop-types';
import React from 'react';
import moment from 'moment';

import './style.css';

const OrdersTable = props => {
  const { title, orders } = props;

  return (
    <>
      {title}
      <table className="orders-table">
        <thead>
          <tr>
            <th className="text-left">User Name</th>
            <th className="text-left">Mobile</th>
            <th className="text-left">Address</th>
            <th className="text-left">Items</th>
            <th className="text-right">Total</th>
            <th className="text-right">Date (DD/MM/YYYY)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="text-left">{`${order.firstName} ${order.lastName}`}</td>
              <td className="text-left">{order.mobile}</td>
              <td className="text-left">{order.address}</td>
              <td className="text-left">
                {order.items.map(item => `${item.quantity}-${item.item}(${item.rate})`).join(', ')}
              </td>
              <td className="text-right">{order.subTotal}</td>
              <td className="text-right">{moment(order.date).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

OrdersTable.propTypes = {
  orders: array.isRequired,
  title: string.isRequired
};

export default OrdersTable;
