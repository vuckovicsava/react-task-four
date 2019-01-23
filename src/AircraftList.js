import React from 'react';
import AircraftItem from './AircraftItem';

const AircraftList = ({ aircrafts }) => (
  <table className="aircraft-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Company</th> 
        <th>Country</th>
        <th>Year</th>
        <th>Manufacturer</th>
      </tr>
    </thead>
    <tbody>
      {aircrafts.map(ac => <AircraftItem key={ac.Id} aircraft={ac}/>)}
    </tbody>
  </table>
);

export default AircraftList;
