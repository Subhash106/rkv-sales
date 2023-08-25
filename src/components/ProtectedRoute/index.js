import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const token = useSelector(state => state.auth.idToken) || localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, []);

  return children;
}
