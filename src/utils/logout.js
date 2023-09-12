import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../store/auth';

export default function signout(dispatch, navigate) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
      navigate('/');
    })
    .catch(error => {
      // An error happened.
      console.error('logout error', error);
    });
}
