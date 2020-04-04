import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom'

import { ELECTRIC_BILLING_ELEMENTS_QUERY } from '../queries';
import { REMOVE_ELECTRIC_BILLING_ELEMENT } from '../mutations';

import Pagination from './Pagination';

class ElectricBillingElements extends Component {
    limit = 10;
    state = {
        pagination: {
            offset: 0,
            current:1
        }
    }

    previousPage = () => {
        this.setState({
            pagination: {
                offset: this.state.pagination.offset - this.limit,
                current: this.state.pagination.current - 1
            }
        })
    }

    nextPage = () => {
        this.setState({
            pagination: {
                offset: this.state.pagination.offset + this.limit,
                current: this.state.pagination.current + 1
            }
        })
    }

    render() {
        return (
            <Query query={ELECTRIC_BILLING_ELEMENTS_QUERY} pollInterval={500} variables={{limit: this.limit, offset: this.state.pagination.offset}}>
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return "Loading...";
                if (error) return `Error: ${error.message}`;
                console.log(data);

                return (
                <Fragment>
                    <h2 className="text-center">Electric Billing Elements List</h2>
                    <ul className="list-group mt-4">
                    {data.getElectricBillingElements.map(electricBillingElement => (
                        <li key={electricBillingElement.id} className="list-group-item">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                            Date: {electricBillingElement.date} - Hour: {electricBillingElement.hour} - Ingestion(Wh): {electricBillingElement.ingestion} - Cost: {electricBillingElement.cost}
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                            <Mutation mutation={REMOVE_ELECTRIC_BILLING_ELEMENT} >
                                {removeElectricBillingElement => (
                                <button
                                    type="button"
                                    className="btn btn-danger d-block d-md-inline-block mr-2"
                                    onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this electric billing element?')) {
                                        removeElectricBillingElement({
                                        variables: { id: electricBillingElement.id }
                                        });
                                    }
                                    }}
                                >
                                    &times; Remove
                                </button>
                                )}
                            </Mutation>
                            <Link
                                to={`/electricbillingelement/edit/${electricBillingElement.id}`}
                                className="btn btn-success d-block d-md-inline-blok">
                                Edit electric billing element
                            </Link>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                    <Pagination 
                        current = {this.state.pagination.current}
                        totalElectricBillingElements = {data.totalElectricBillingElements}
                        limit = {this.limit}
                        previousPage = {this.previousPage}
                        nextPage = {this.nextPage}
                    /> 
                </Fragment>
                )
            }}
            </Query>
        )
    }
    
}

export default ElectricBillingElements;