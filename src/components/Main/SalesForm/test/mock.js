export default () => ({
  values: {
    mobile: '123',
    firstName: 'test',
    lastName: 'test',
    address: 'test',
    items: [{ item: 'test', quantity: 1, rate: 100 }],
    subTotal: 'test',
    date: 'test'
  },
  handleChange: () => jest.fn(),
  setFieldValue: () => jest.fn(),
  handleSubmit: () => jest.fn()
});
