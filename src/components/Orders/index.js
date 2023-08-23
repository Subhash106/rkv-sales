import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';
import { DB } from '../shared/utilities';
import OrdersTable from './ordersTable';
import getOfflineStatus from '../shared/getOfflineStatus';
import TextInput from '../shared/TextInput';
import moment from 'moment';
import { useGetOrdersQuery } from '../../store/base';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isOffline = getOfflineStatus();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const { data: onlineOrders = [] } = useGetOrdersQuery();

  const getOfflineOrders = async () => {
    const transactionDB = DB.getTransactionDB();
    const offlineOrders = [];
    await transactionDB.iterate(order => {
      offlineOrders.push(order);
    });

    return offlineOrders;
  };

  useEffect(() => {
    const getData = async () => {
      const offOrders = await getOfflineOrders();
      setOfflineOrders(offOrders);
    };
    getData();
  }, []);

  const syncOfflineOrders = async () => {
    const transactionDB = DB.getTransactionDB();
    const offlineOrders = [];
    await transactionDB.iterate((order, key) => {
      offlineOrders.push([key, order]);
    });

    await Promise.all(
      offlineOrders.map(async ([key, order]) => {
        return await fetch('https://basic-react-a8d88-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST',
          body: JSON.stringify({
            ...order
          })
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log(data);
            transactionDB.removeItem(key);
          });
      })
    );

    const offOrders = await getOfflineOrders();
    setOfflineOrders(offOrders);
  };

  const offlineTableHeader = () => {
    return (
      <header className="table-header">
        <h2 className="heading-secondary">Offline Orders</h2>
        {!isOffline && <Button onClick={syncOfflineOrders}>Sync</Button>}
      </header>
    );
  };

  const onlineTableHeader = () => {
    return (
      <header className="table-header">
        <h2 className="heading-secondary">Online Orders</h2>
      </header>
    );
  };

  const dateChangeHandler = e => {
    const {
      target: { value }
    } = e;
    setDate(value);
    navigate('/orders');
  };

  useEffect(() => {
    const filteredData = Object.values(onlineOrders).filter(order => {
      const orderDateArray = order?.date?.split('-');
      const dateArray = date?.split('-');

      if (params.get('month') && params.get('year')) {
        return +orderDateArray?.[0] === +params.get('year') && +orderDateArray?.[1] === +params.get('month');
      }

      return (
        orderDateArray?.[0] === dateArray?.[0] &&
        orderDateArray?.[1] === dateArray?.[1] &&
        orderDateArray?.[2] === dateArray?.[2]
      );
    });
    setFilteredOrders(filteredData);
  }, [date, onlineOrders]);

  return (
    <div className="orders">
      <div className="bg-white" style={{ padding: '2rem', borderRadius: '1.2rem' }}>
        <h1 className="heading-primary">Orders</h1>
        <div className="filters">
          <TextInput value={date} onChange={dateChangeHandler} type="date" id="date" label="Select Date" />
        </div>
        <OrdersTable title={offlineTableHeader()} orders={offlineOrders} />
        <OrdersTable title={onlineTableHeader()} orders={filteredOrders} />
      </div>
    </div>
  );
};

export default Orders;
