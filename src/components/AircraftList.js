import React from 'react';
import AircraftItem from './AircraftItem';

const AircraftList = ({ aircrafts }) => (
  <div className="table-wrapper">
    <table className="aircraft-table">
      <thead>
        <tr>
          <th>ID</th>
          <th className="hide-on-md">Company</th> 
          <th>Country</th>
          <th>Year</th>
          <th>Manufacturer</th>
          <th>More Details</th>
        </tr>
      </thead>
      <tbody>
        {aircrafts.map(ac => <AircraftItem key={ac.Id} aircraft={ac}/>)}
      </tbody>
    </table>
  </div>
);

export default AircraftList;
