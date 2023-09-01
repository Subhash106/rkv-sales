import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../store/auth';

export default function signout(dispatch, navigate) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresIn');
      navigate('/');
    })
    .catch(error => {
      // An error happened.
      console.error('logout error', error);
    });
}
