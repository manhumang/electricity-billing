/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_ELECTRIC_BILLING_ELEMENT } from '../mutations';

const NewElectricBillingElement = (props) => {
  const [electricBillingElement, setElectricBillingElement] = useState({
    date: '',
    hour: null,
    ingestion: null,
    price: null,
    cost: null,
  });
  const [error, setError] = useState(false);
  const [createElectricBillingElement] = useMutation(CREATE_ELECTRIC_BILLING_ELEMENT, {
    onCompleted: () => props.history.push('/'),
  });

  const response = (error) ? <p className="alert alert-danger text-center p-3">All fields are required.</p> : '';
  return (
    <>
      <h2 className="text-center">New Electric Billing Element</h2>
      {response}
      <div className="row justify-content-center">

        <form
          className="col-md-8 m-3"
          onSubmit={(e) => {
            e.preventDefault();

            const {
              date, hour, ingestion, price, cost,
            } = electricBillingElement;

            if (date === '' || hour === null || ingestion === null || price === null || cost === null) {
              setError(true);
              return;
            }

            setError(false);

            const input = {
              date,
              hour: Number(hour),
              ingestion: Number(ingestion),
              price: Number(price),
              cost: Number(cost),
            };

            createElectricBillingElement({
              variables: { input },
            });
          }}
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Date"
                onChange={(e) => {
                  setElectricBillingElement({
                    ...electricBillingElement,
                    date: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Hour</label>
              <input
                type="text"
                className="form-control"
                placeholder="Hour"
                onChange={(e) => {
                  setElectricBillingElement({
                    ...electricBillingElement,
                    hour: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Ingestion</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingestion"
                onChange={(e) => {
                  setElectricBillingElement({
                    ...electricBillingElement,
                    ingestion: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                onChange={(e) => {
                  setElectricBillingElement({
                    ...electricBillingElement,
                    price: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Cost</label>
              <input
                type="text"
                className="form-control"
                placeholder="Cost"
                onChange={(e) => {
                  setElectricBillingElement({
                    ...electricBillingElement,
                    cost: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success float-right">Add Electric Billing Element</button>
        </form>
      </div>
    </>
  );
};

export default NewElectricBillingElement;
