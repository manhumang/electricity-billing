/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { UPDATE_ELECTRIC_BILLING_ELEMENT } from '../mutations';

const ElectricBillingElementForm = (props) => {
  // eslint-disable-next-line max-len
  const [electricBillingElement, setElectricBillingElement] = useState(props.electricBillingElement);
  const [updateElectricBillingElement] = useMutation(UPDATE_ELECTRIC_BILLING_ELEMENT, {
    onCompleted: () => props.refetch().then(() => {
      props.history.push('/');
    }),
  });
  const {
    id, date, hour, ingestion, price, cost,
  } = electricBillingElement;
  return (

    <form
      className="col-md-8 m-3"
      onSubmit={(e) => {
        e.preventDefault();

        const input = {
          id,
          date,
          hour: Number(hour),
          ingestion: Number(ingestion),
          price: Number(price),
          cost: Number(cost),
        };

        updateElectricBillingElement({
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
            defaultValue={date}
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
            defaultValue={hour}
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
            defaultValue={ingestion}
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
            defaultValue={price}
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
            defaultValue={cost}
            onChange={(e) => {
              setElectricBillingElement({
                ...electricBillingElement,
                cost: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success float-right">Save</button>
    </form>

  );
};


export default withRouter(ElectricBillingElementForm);
