import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { DB } from '../shared/utilities';
import SalesTable from './SalesTable';
import getOfflineStatus from '../shared/getOfflineStatus';
import TextInput from '../shared/TextInput';
import { useGetOrdersQuery, useStoreOrdersMutation } from '../../services/base';

const SalesSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const month = params.get('month');
  const year = params.get('year');
  const isOffline = getOfflineStatus();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const { data: onlineOrders = [], isLoading } = useGetOrdersQuery();
  const [addOrder] = useStoreOrdersMutation();

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
        try {
          const { error } = await addOrder(order);
          if (!error) {
            transactionDB.removeItem(key);
          }

          return true;
        } catch (e) {
          throw new Error(e.message);
        }
      })
    );

    const offOrders = await getOfflineOrders();
    setOfflineOrders(offOrders);
  };

  const offlineTableHeader = () => {
    return (
      <header className="table-header">
        <h2 className="heading-secondary">{t('salesSummary.offlineSales')}</h2>
        {!isOffline && <Button onClick={syncOfflineOrders}>{t('salesSummary.sync')}</Button>}
      </header>
    );
  };

  const onlineTableHeader = () => {
    return (
      <header className="table-header">
        <h2 className="heading-secondary">{t('salesSummary.onlineSales')}</h2>
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

      if (month && year) {
        return +orderDateArray?.[0] === +year && +orderDateArray?.[1] === +month;
      }

      return (
        orderDateArray?.[0] === dateArray?.[0] &&
        orderDateArray?.[1] === dateArray?.[1] &&
        orderDateArray?.[2] === dateArray?.[2]
      );
    });
    setFilteredOrders(filteredData);
  }, [date, month, year, isLoading]);

  return (
    <div className="orders">
      <div className="bg-white page-wrapper">
        <h1 className="heading-primary">{t('salesSummary.title')}</h1>
        <div className="mb-sm">
          <TextInput value={date} onChange={dateChangeHandler} name="date" type="date" id="date" label="Select Date" />
        </div>
        <SalesTable title={offlineTableHeader()} orders={offlineOrders} />
        <SalesTable isLoading={isLoading} title={onlineTableHeader()} orders={filteredOrders} />
      </div>
    </div>
  );
};

export default SalesSummary;
