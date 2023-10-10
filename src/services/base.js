import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_URL || 'https://food-order-app-e5c31-default-rtdb.firebaseio.com/'
});

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const state = api.getState();
  const urlEnd = typeof args === 'string' ? args : args.url;
  // construct a dynamically generated portion of the url
  const adjustedUrl = `${urlEnd}?auth=${
    state.auth === null ? '' : state.auth.idToken || localStorage.getItem('token')
  }`;
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
    }),
    getInventory: builder.query({
      query: () => 'inventory.json'
    }),
    storeOrders: builder.mutation({
      query: order => ({
        url: 'orders.json',
        method: 'POST',
        body: order
      })
    }),
    storePurchases: builder.mutation({
      query: purchase => ({
        url: 'purchases.json',
        method: 'POST',
        body: purchase
      })
    }),
    storeInventroy: builder.mutation({
      query: inventory => ({
        url: 'inventory.json',
        method: 'POST',
        body: inventory
      })
    }),
    patchInventroy: builder.mutation({
      query: payload => {
        const { id, key, value } = payload;

        return {
          url: `inventory/${id}.json`,
          method: 'PATCH',
          body: { [key]: value }
        };
      }
    })
  })
});

export const {
  useGetPurchasesQuery,
  useGetOrdersQuery,
  useGetInventoryQuery,
  useStoreOrdersMutation,
  useStorePurchasesMutation,
  useStoreInventroyMutation,
  usePatchInventroyMutation,
  useLazyGetInventoryQuery
} = baseAPIs;
export default baseAPIs;
