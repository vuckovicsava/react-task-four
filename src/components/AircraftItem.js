import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';
import planeImg from '../images/plane.png';


const AircraftItem = ({ aircraft }) => {
  const { Id, Op, Cou, Year, Man } = aircraft;

  return (
    <Consumer>
      {({ setActiveAircraft }) => (
        <tr>
          <td>{Id}</td>
          <td>
            <img 
              src={Op ? `https://logo.clearbit.com/${Op.toLowerCase().replace(/\s/g, '')}.com` : planeImg }
              onError={e => e.target.src = planeImg}
              alt={Op}
            />
          </td>
          <td>{Cou || 'Not Available'}</td>
          <td>{Year || 'Not Available'}</td>
          <td>{Man || 'Not Available'}</td>
          <td>
            <Link to={`/aircraft/${Id}`} onClick={() => setActiveAircraft(Id)}>
              See More Details
            </Link>
          </td>
        </tr>
      )}
    </Consumer>
  );
}

export default AircraftItem;