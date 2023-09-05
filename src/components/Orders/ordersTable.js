import { array, string } from 'prop-types';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import './style.css';

const OrdersTable = props => {
  const { t } = useTranslation();
  const { title, orders } = props;

  return (
    <>
      {title}
      <table className="orders-table">
        <thead>
          <tr>
            <th className="text-left">{t('salesSummary.customerName')}</th>
            <th className="text-left">{t('salesSummary.mobile')}</th>
            <th className="text-left">{t('salesSummary.address')}</th>
            <th className="text-left">{t('salesSummary.items')}</th>
            <th className="text-right">{t('salesSummary.total')}</th>
            <th className="text-right">{t('salesSummary.date')}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="text-left">{`${order.firstName} ${order.lastName}`}</td>
              <td className="text-left word-wrap">{order.mobile}</td>
              <td className="text-left">{order.address}</td>
              <td className="text-left">
                {order.items.map(item => `${item.quantity}-${item.item}(${item.rate})`).join(', ')}
              </td>
              <td className="text-right">{order.subTotal}</td>
              <td className="text-right word-wrap">{moment(order.date).format('DD/MM/YYYY')}</td>
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
