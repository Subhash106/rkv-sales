import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const token = useSelector(state => state.auth.idToken) || localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, []);

  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
