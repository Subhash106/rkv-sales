import { string } from 'prop-types';
import React from 'react';

export default function NoRecord({ message }) {
  return <p className="text-center p-sm">{message}</p>;
}

NoRecord.propTypes = {
  message: string.isRequired
};

NoRecord.defaultProps = {
  message: 'No Records found!'
};
