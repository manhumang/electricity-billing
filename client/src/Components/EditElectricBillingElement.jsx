/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ELECTRIC_BILLING_ELEMENT_QUERY } from '../queries';
import ElectricBillingElementForm from './ElectricBillingElementForm';


const EditElectricBillingElement = (props) => {
  // get id of edit electric billing element
  const { id } = props.match.params;
  const {
    loading, error, data, refetch,
  } = useQuery(ELECTRIC_BILLING_ELEMENT_QUERY, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  return (
    <>
      <h2 className="text-center">Edit Electric Billing Element</h2>
      <div className="row justify-content-center">

        <ElectricBillingElementForm
          electricBillingElement={data.getElectricBillingElement}
          refetch={refetch}
        />

      </div>
    </>
  );
};

export default EditElectricBillingElement;
