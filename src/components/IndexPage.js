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
      <div>
        <button onClick={getGeolocationData}>Get Aircraft Data</button>

        { fetching && <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={fetching} /> }

        { shownAircrafts.length > 0 && (
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