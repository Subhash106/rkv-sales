import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../store/auth';

export default async function signout(dispatch, navigate) {
  const auth = getAuth();
  try {
    await signOut(auth);
    // Sign-out successful.
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    dispatch(logout());
    navigate('/');
  } catch (error) {
    // An error happened.
    throw new Error(error.message);
  }
}
