/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Pagination = (props) => {
  const pagination = {
    pages: Math.ceil(Number(props.totalElectricBillingElements) / props.limit),
  };

  const { current } = props;

  // Previous Button
  const btnPrevious = (current > 1) ? (
    <button onClick={props.previousPage} type="button" className="btn btn-success mr-2">
      &laquo;
      Previous
    </button>
  ) : '';

  // Next Button
  const { pages } = pagination;
  const btnNext = (current !== pages) ? (
    <button onClick={props.nextPage} type="button" className="btn btn-success">
      Next &raquo;
    </button>
  ) : '';

  return (
    <div className="mt-5 d-flex justify-content-center">
      {btnPrevious}
      {btnNext}
    </div>
  );
};

export default Pagination;
