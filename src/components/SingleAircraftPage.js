import React from 'react';
import { Consumer } from '../context';

const SingleAircraftPage = () => (
  <Consumer>
    {({ activeAircraft }) => {
      return activeAircraft ? (
        <div>
          Ima ga
        </div>
      ) : (<h1>No Active Aircraft</h1>)
    }}
  </Consumer>
)

export default SingleAircraftPage;