import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://basic-react-a8d88-default-rtdb.firebaseio.com/'
});

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const state = api.getState();
  const urlEnd = typeof args === 'string' ? args : args.url;
  // construct a dynamically generated portion of the url
  const adjustedUrl = `${urlEnd}?auth=${state.auth.idToken || localStorage.getItem('token')}`;
  const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

const baseAPIs = createApi({
  reducerPath: 'rkvApi',
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({
    getPurchases: builder.query({
      query: () => 'purchases.json'
    }),
    getOrders: builder.query({
      query: () => 'orders.json'
    })
  })
});

export const { useGetPurchasesQuery, useGetOrdersQuery } = baseAPIs;
export default baseAPIs;
