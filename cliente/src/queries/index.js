import gql from 'graphql-tag';

export const ELECTRIC_BILLING_ELEMENTS_QUERY = gql`
    query getElectricBillingElements($limit: Int, $offset: Int){
      getElectricBillingElements(limit: $limit, offset: $offset){
            id
            date
            hour
            ingestion
            price
            cost
        }
        totalElectricBillingElements
    }
 `;

export const ELECTRIC_BILLING_ELEMENT_QUERY = gql`
  query getElectricBillingElement($id: ID){
    getElectricBillingElement(id: $id){
    id
    date
    hour
    ingestion
    price
    cost
  }
}
`;