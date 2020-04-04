import React, { Component, Fragment } from 'react';
import { ELECTRIC_BILLING_ELEMENT_QUERY } from '../queries';
import { Query } from 'react-apollo';
import ElectricBillingElementForm from './ElectricBillingElementForm';

class EditElectricBillingElement extends Component {
  state = {  }
  render() {
    // get id of edit electric billing element
    const { id } = this.props.match.params;
    
    return (
      <Fragment>
        <h2 className="text-center">Edit Electric Billing Element</h2>
        <div className="row justify-content-center">
          <Query query={ELECTRIC_BILLING_ELEMENT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <ElectricBillingElementForm
                  electricBillingElement={data.getElectricBillingElement}
                  refetch={refetch}
                />
              )
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}
 
export default EditElectricBillingElement;