import { Formik } from 'formik';
import moment from 'moment';
// import Yup from 'yup';
import React from 'react';
import { DB, isOffline } from '../../shared/utilities';
import SalesFormFields from './form';
import './style.css';

const SalesForm = () => {
  const formData = {
    date: moment().format('YYYY-MM-DD'),
    mobile: '',
    firstName: '',
    lastName: '',
    address: '',
    items: [{ item: '', quantity: '', rate: '' }],
    subTotal: 0
  };

  //   const getValidationSchema = () =>
  //     Yup.object().shape({
  //       firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  //       lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  //       mobile: Yup.number().min(10, 'Too Short!').max(10, 'Too Long!').required('Required')
  //     });

  const submitHandler = async payload => {
    if (!isOffline()) {
      const orderData = await fetch('https://basic-react-a8d88-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({ ...payload })
      });

      const orderDataResponse = await orderData.json();

      console.log('orderDataResponse', orderDataResponse);
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
    <Formik
      initialValues={formData}
      onSubmit={(values, { resetForm }) => {
        submitHandler(values);
        resetForm({ ...formData, items: [] });
      }}
    >
      {formProps => <SalesFormFields {...formProps} />}
    </Formik>
  );
};

export default SalesForm;
