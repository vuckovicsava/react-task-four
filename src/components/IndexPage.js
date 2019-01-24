import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Pagination from 'react-js-pagination';
import AircraftList from './AircraftList';

export default class IndexPage extends Component {

  state = {
    shownAircrafts: []
  }

  render() {
    return (
      <>
        <h1>React Task Four</h1>
        <button>Get Aircraft Data</button>
        <hr/>

        { 
          this.state.fetching 
            ? <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.fetching}
              /> 
            : <AircraftList aircrafts={this.state.shownAircrafts}/> 
        }

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsPerPage}
          totalItemsCount={this.state.allAircrafts.length}
          pageRangeDisplayed={this.state.pageRangeDisplayed}
          onChange={this.handlePageChange}
          firstPageText="First"
          lastPageText="Last"
          prevPageText="Prev"
          nextPageText="Next"
        />
      </>
    );
  }
}