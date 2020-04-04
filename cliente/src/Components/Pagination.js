import React, {Component} from 'react';

class Pagination extends Component {
    state = {
        pagination : {
            pages: Math.ceil(Number(this.props.totalElectricBillingElements) / this.props.limit)
        }
    }
    render() {
        const {current} = this.props;
        console.log(current);
        //Previous Button
        const btnPrevious = (current > 1) ? <button onClick={this.props.previousPage} type="button" className="btn btn-success mr-2">&laquo;
        Previous</button> : '';

        //Next Button
        const {pages} = this.state.pagination;
        const btnNext = (current !== pages) ? <button onClick={this.props.nextPage} type="button" className="btn btn-success">
        Next &raquo;</button> : '';

        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnPrevious}
                {btnNext}
            </div>
        );
    }
}

export default Pagination;