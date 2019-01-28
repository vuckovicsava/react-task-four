import React from 'react';
import { ClipLoader } from 'react-spinners';
import Pagination from 'react-js-pagination';
import { Consumer } from '../context';
import AircraftList from './AircraftList';

const IndexPage = () => (
  <Consumer>
    {({ 
      getGeolocationData, 
      fetching, 
      activePage, 
      itemsPerPage, 
      allAircrafts, 
      pageRange, 
      handlePageChange,
      shownAircrafts
    }) => (
      <div className="container">
        <h1 className="title">React Task Four</h1>
        <button
          className="btn"
          onClick={getGeolocationData}
        >
          Get Aircraft Data
        </button>

        { fetching && (
          <div className="spinner"> 
            <ClipLoader 
              sizeUnit={'px'} 
              size={100} 
              color={'#123abc'} 
              loading={fetching} 
            />
          </div>
        )}

        { (shownAircrafts.length > 0 && !fetching) && (
          <>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={allAircrafts.length}
              pageRangeDisplayed={pageRange}
              onChange={handlePageChange}
              firstPageText="First"
              lastPageText="Last"
              prevPageText="Prev"
              nextPageText="Next"
            />
            <AircraftList aircrafts={shownAircrafts}/>
          </>
        )}
      </div>
    )}
  </Consumer>
);

export default IndexPage;