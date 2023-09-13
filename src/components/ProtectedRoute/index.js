import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageSkeleton from '../Loader/PageSkeleton';

export default function ProtectedRoute({ children }) {
  const token =
    useSelector(state => {
      if (state.auth === null) return false;
      return state.auth.idToken;
    }) || localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, []);

  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
