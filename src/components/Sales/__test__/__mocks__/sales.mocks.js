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
  handleSubmit: () => jest.fn(),
  errors: { mobile: '123', firstName: 'test', lastName: 'test', address: 'test' },
  touched: { mobile: false, firstName: false, lastName: false, address: false },
  feedback: {
    success: true,
    error: false,
    successMessage: 'Save successfully',
    errorMessage: ''
  },
  isLoading: false
});
