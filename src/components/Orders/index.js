import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Button from '../shared/Button';
import { DB } from '../shared/utilities';
import OrdersTable from './ordersTable';
import getOfflineStatus from '../shared/getOfflineStatus';
import TextInput from '../shared/TextInput';
import moment from 'moment';

const Orders = () => {
  const isOffline = getOfflineStatus();
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const getOnlineOrders = async () => {
    const orderResponse = await fetch('https://basic-react-a8d88-default-rtdb.firebaseio.com/orders.json');
    const orderData = await orderResponse.json();
    const formatedData = [];

    for (const data in orderData) {
      formatedData.push(orderData[data]);
    }

    return formatedData;
  };

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
      const data = await getOnlineOrders();
      setOnlineOrders(data);

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

    const data = await getOnlineOrders();
    setOnlineOrders(data);
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
  };

  useEffect(() => {
    console.log('onlineOrders', onlineOrders);

    const filteredData = onlineOrders.filter(
      order => moment(order.date, 'YYYY-MM-DD').format('YYYY-MM-DD') === moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    );

    console.log('filteredData', filteredData);

    setFilteredOrders(filteredData);
  }, [date]);

  return (
    <>
      <Header />
      <div className="container orders bg-gray">
        <div className="bg-white" style={{ padding: '2rem', borderRadius: '1.2rem' }}>
          <h1 className="heading-primary">Orders</h1>
          <div className="filters">
            <TextInput value={date} onChange={dateChangeHandler} type="date" id="date" label="Select Date" />
          </div>
          <OrdersTable title={offlineTableHeader()} orders={offlineOrders} />
          <OrdersTable title={onlineTableHeader()} orders={filteredOrders} />
        </div>
      </div>
    </>
  );
};

export default Orders;
