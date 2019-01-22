import React from 'react';
import FlightItem from './FlightItem';

const FlightList = ({ flights }) => (
  <table className="flight-table">
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
      {flights.map(flight => <FlightItem key={flight.Id} flight={flight}/>)}
    </tbody>
  </table>
);

export default FlightList;
