import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { ELECTRIC_BILLING_ELEMENTS_QUERY } from '../queries';

const ElectricBillingGraph = () => {
  const limit = 5;
  const { loading, error, data } = useQuery(ELECTRIC_BILLING_ELEMENTS_QUERY, {
    variables: { limit, offset: 0 },
  });
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  const datas = [];
  // eslint-disable-next-line no-lone-blocks
  { data.getElectricBillingElements.map((electricBillingElement) => (
    datas.push({
      date: electricBillingElement.date,
      hour: electricBillingElement.hour,
      ingestion: electricBillingElement.ingestion,
    })
  )); }

  return (
    <>
      <h2 className="text-center">Electric Billing Graph</h2>
      <BarChart
        width={1000}
        height={500}
        data={datas}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hour" fill="#8884d8" />
        <Bar dataKey="ingestion" fill="#82ca9d" />
      </BarChart>
    </>

  );
};

export default ElectricBillingGraph;
