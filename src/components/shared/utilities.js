import localforage from 'localforage';

export const isOffline = () => !navigator.onLine;

export const DB = {
  getMasterDB: () =>
    localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: 'Master Data'
    }),
  getTransactionDB: () =>
    localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: 'Transaction Data'
    })
};
