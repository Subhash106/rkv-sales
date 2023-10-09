import { array, bool, node } from 'prop-types';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import '../shared/table.css';
import './style.css';
import NoRecord from '../NoRecord';
import TableSkelton from '../Loader/TableSkelton';
import unitConverter from '../../utils/unitConverter';

const SalesTable = props => {
  const { t } = useTranslation();
  const { title, orders, isLoading = false } = props;

  return (
    <>
      {title}
      {isLoading ? (
        <TableSkelton columns={6} rows={3} />
      ) : (
        <table className="table sales-summary">
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
            {orders.length > 0 ? (
              orders.map(({ firstName, lastName, mobile, address, items, date, subTotal, unit }, index) => (
                <tr key={index}>
                  <td className="text-left">{`${firstName} ${lastName}`}</td>
                  <td className="text-left word-wrap">{mobile}</td>
                  <td className="text-left">{address}</td>
                  <td className="text-left">
                    {items.map(item => `${item.quantity} ${unitConverter(unit)}-${item.item}(${item.rate})`).join(', ')}
                  </td>
                  <td className="text-right">{subTotal}</td>
                  <td className="text-right word-wrap">{moment(date).format('DD/MM/YY')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <NoRecord message={t('salesSummary.noRecord')} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

SalesTable.propTypes = {
  isLoading: bool,
  orders: array.isRequired,
  title: node.isRequired
};

SalesTable.defaultProps = {
  isLoading: false
};

export default SalesTable;
