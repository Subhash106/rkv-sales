import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseAPIs = createApi({
  reducerPath: 'rkvApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://basic-react-a8d88-default-rtdb.firebaseio.com/'
  }),
  endpoints: builder => ({
    getPurchases: builder.query({
      query: () => 'purchases.json'
    })
  })
});

export const { useGetPurchasesQuery } = baseAPIs;
export default baseAPIs;
