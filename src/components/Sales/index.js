import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePatchInventroyMutation, useStoreOrdersMutation } from '../../services/base';
import { DB, isOffline } from '../shared/utilities';
import SalesFormFields from './form';
import './style.css';

const Sales = () => {
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const { t } = useTranslation();
  const [addOrder, { isLoading }] = useStoreOrdersMutation();
  const [patchInventroy] = usePatchInventroyMutation();
  const formData = {
    date: moment().format('YYYY-MM-DD'),
    mobile: '',
    firstName: '',
    lastName: '',
    address: '',
    items: [{ item: '', quantity: '', rate: '', unit: '', totalQuantity: '', id: '' }],
    subTotal: 0
  };

  const getValidationSchema = () => {
    const required = t('required');

    return Yup.object().shape({
      firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(required),
      lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(required),
      mobile: Yup.string().min(10, 'Too Short!').max(10, 'Too Long!').required(required),
      address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(required),
      items: Yup.array().of(
        Yup.object().shape({
          // item: Yup.string(),
          quantity: Yup.number().required(required)
        })
      )
    });
  };

  const submitHandler = async payload => {
    if (!isOffline()) {
      setTimeout(() => {
        setFeedback({ ...feedback, error: false, success: false });
      }, 10000);

      try {
        // Reduce inventory
        await Promise.allSettled(
          payload.items.filter(
            ({ id, quantity, totalQuantity }) =>
              id && patchInventroy({ id, key: 'quantity', value: totalQuantity - quantity }).unwrap()
          )
        );

        // Add sale
        await addOrder(payload).unwrap();
        setFeedback({ ...feedback, success: true, successMessage: t('sales.savedSuccessfully') });
        return true;
      } catch (e) {
        setFeedback({ ...feedback, error: true, errorMessage: t('sales.savedError') });
        return false;
      }
    } else {
      //Store Data to indexedDb
      const transactionDB = DB.getTransactionDB();
      transactionDB.setItem(Date.now(), payload);

      navigator.serviceWorker.ready.then(function (swRegistration) {
        return swRegistration.sync.register('orderSync');
      });
    }
  };

  return (
    <div className="sales">
      <Formik
        initialValues={formData}
        validationSchema={getValidationSchema()}
        onSubmit={async (values, { resetForm, setFieldValue }) => {
          const res = await submitHandler(values);
          if (res) {
            resetForm({ ...formData, items: [] });
            setFieldValue('items', [{ item: '', quantity: '', rate: '', unit: '', totalQuantity: '', id: '' }]);
          }
        }}
      >
        {formProps => <SalesFormFields {...formProps} feedback={feedback} isLoading={isLoading} />}
      </Formik>
    </div>
  );
};

export default Sales;
