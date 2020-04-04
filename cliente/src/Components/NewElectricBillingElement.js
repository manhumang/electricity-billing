import React, { Component, Fragment } from 'react';

import { CREATE_ELECTRIC_BILLING_ELEMENT } from '../mutations';
import { Mutation } from 'react-apollo';

class NewElectricBillingElement extends Component {
  state = {
    electricBillingElement: {
      date: '',
      hour: null,
      ingestion: null,
      price: null,
      cost: null
    },
    error: false,
  }

  render() {
    const { error } = this.state;
    let response = (error) ? <p className="alert alert-danger text-center p-3">All fields are required.</p> : '';

    return (
      <Fragment>
        <h2 className="text-center">New Electric Billing Element</h2>
        {response}
        <div className="row justify-content-center">          
          <Mutation
            mutation={CREATE_ELECTRIC_BILLING_ELEMENT}
            onCompleted={() => this.props.history.push('/')}
          >
            {createElectricBillingElement => ( 
              <form className="col-md-8 m-3"
            onSubmit={e => {
              e.preventDefault();

              const { date, hour, ingestion, price, cost } = this.state.electricBillingElement;

              if (date === '' || hour === null || ingestion === null || price === null || cost === null) {
                this.setState({
                  error: true
                });
                return;
              }

              this.setState({
                error: false
              });

              const input = {
                date, hour: Number(hour), ingestion: Number(ingestion), price: Number(price), cost: Number(cost)
              };

              createElectricBillingElement({
                variables: { input }
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
                      onChange={e => {
                        this.setState({
                          electricBillingElement: {
                            ...this.state.electricBillingElement,
                            date: e.target.value
                          }
                        })
                      }}
                      />
                </div>
                <div className="form-group col-md-6">
                    <label>Hour</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hour" 
                      onChange={e => {
                        this.setState({
                          electricBillingElement: {
                            ...this.state.electricBillingElement,
                            hour: e.target.value
                          }
                        })
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
                    onChange={e => {
                      this.setState({
                        electricBillingElement: {
                          ...this.state.electricBillingElement,
                          ingestion: e.target.value
                        }
                      })
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
                      onChange={e => {
                        this.setState({
                          electricBillingElement: {
                            ...this.state.electricBillingElement,
                            price: e.target.value
                          }
                        })
                      }}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>Cost</label>
                    <input 
                      type="text"
                      className="form-control"
                      placeholder="Cost"
                      onChange={e => {
                        this.setState({
                          electricBillingElement: {
                            ...this.state.electricBillingElement,
                            cost: e.target.value
                          }
                        })
                      }}
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-success float-right">Add Electric Billing Element</button>
          </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default NewElectricBillingElement;