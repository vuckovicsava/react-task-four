import React from 'react';
import FlightItem from './FlightItem';

const FlightList = ({ flights }) => (
  <table>
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {flights.map(flight => <FlightItem key={flight.Id} flight={flight}/>)}
    </tbody>
  </table>
);

export default FlightList;
