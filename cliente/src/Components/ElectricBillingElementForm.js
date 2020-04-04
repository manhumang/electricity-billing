import React, { Component } from 'react';
import { UPDATE_ELECTRIC_BILLING_ELEMENT } from '../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class ElectricBillingElementForm extends Component {

  state = {
    electricBillingElement: this.props.electricBillingElement,
  }

  render() {
    const { date, hour, ingestion, price, cost } = this.state.electricBillingElement;  
    return (
      <Mutation
        mutation={UPDATE_ELECTRIC_BILLING_ELEMENT}
        onCompleted={() => this.props.refetch().then(() => {
          this.props.history.push('/')
        })}
      >
        {updateElectricBillingElement => (
          <form className="col-md-8 m-3" onSubmit={e => {
            e.preventDefault();
            const { id, date, hour, ingestion, price, cost } = this.state.electricBillingElement;
            const input = { id, date, hour: Number(hour), ingestion: Number(ingestion), price: Number(price), cost: Number(cost) }
            
            updateElectricBillingElement({
              variables: { input }
            });
          }}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Date</label>
                    <input
                        type="text" 
                        className="form-control"
                        defaultValue={date}
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
                        defaultValue={hour}
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
                        defaultValue={ingestion}
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
                        defaultValue={price}
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
                        defaultValue={cost}
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
            <button type="submit" className="btn btn-success float-right">Save</button>
          </form>
        )}
      </Mutation>
              )      
  }
  }
   
  
export default withRouter(ElectricBillingElementForm);