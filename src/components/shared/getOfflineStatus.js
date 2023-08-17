import { useCallback, useEffect, useState } from 'react';

const getOfflineStatus = () => {
  const [offline, setOffline] = useState(false);
  const connectionChangeHandler = useCallback(() => {
    setOffline(!navigator.onLine);
  }, [setOffline]);
  useEffect(() => {
    window.addEventListener('online', connectionChangeHandler);
    window.addEventListener('offline', connectionChangeHandler);

    return () => {
      window.removeEventListener('online', connectionChangeHandler);
      window.removeEventListener('offline', connectionChangeHandler);
    };
  }, [connectionChangeHandler]);

  return offline;
};

export default getOfflineStatus;
