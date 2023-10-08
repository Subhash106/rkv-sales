import { Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useStoreInventroyMutation } from '../../../services/base';
import InventoryForm from './form';

export default function AddInventory() {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({ success: false, error: false, errorMessage: '', successMessage: '' });
  const [addInventory, { isLoading }] = useStoreInventroyMutation();

  const formData = {
    date: moment().format('YYYY-MM-DD'),
    item: '',
    color: '',
    unit: '',
    price: '',
    quantity: '',
    comment: ''
  };

  const getValidationSchema = () => {
    const required = t('required');

    return Yup.object().shape({
      item: Yup.string().required(required),
      color: Yup.string().required(required),
      unit: Yup.string().required(required),
      date: Yup.string().required(required),
      price: Yup.number().required(required),
      quantity: Yup.number().required(required)
    });
  };

  const submitHandler = async payload => {
    setTimeout(() => {
      setFeedback({ ...feedback, error: false, success: false });
    }, 10000);

    try {
      await addInventory(payload).unwrap();
      setFeedback({ ...feedback, success: true, successMessage: t('inventory.savedSuccessfully') });
      return true;
    } catch (e) {
      setFeedback({ ...feedback, error: true, errorMessage: t('inventory.savedError') });
      return false;
    }
  };

  return (
    <div>
      <h1 className="heading-primary">{t('inventory.title')}</h1>
      <div>
        <Formik
          initialValues={formData}
          validationSchema={getValidationSchema()}
          onSubmit={async (values, { resetForm }) => {
            const res = await submitHandler(values);
            if (res) {
              resetForm({ ...formData });
            }
          }}
        >
          {formProps => <InventoryForm {...formProps} isLoading={isLoading} feedback={feedback} />}
        </Formik>
      </div>
    </div>
  );
}
