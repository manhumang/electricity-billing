import gql from 'graphql-tag';

export const CREATE_ELECTRIC_BILLING_ELEMENT = gql`
mutation createElectricBillingElement($input:ElectricBillingElementInput) {
  createElectricBillingElement(input:$input) {
    date
    hour
    ingestion
    price
    cost
  }
}
`;

export const UPDATE_ELECTRIC_BILLING_ELEMENT = gql`
mutation updateElectricBillingElement($input: ElectricBillingElementInput) {
  updateElectricBillingElement(input: $input){
    id
    date
    hour
    ingestion
    price
    cost
  }
}`;

export const REMOVE_ELECTRIC_BILLING_ELEMENT = gql`
mutation removeElectricBillingElement($id: ID!) {
  removeElectricBillingElement(id: $id)
}`;