import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';
import planeImg from '../images/plane.png';

const SingleAircraftPage = () => (
  <Consumer>
    {({ activeAircraft }) => {
      if (!activeAircraft) return <div className="error-msg">No Active Aircraft</div>;

      const { Id, From, To, Cou, Man, Op, Type, Year } = activeAircraft;

      return (
        <div className="active-aircraft container">
          <img 
            src={Op ? `https://logo.clearbit.com/${Op.toLowerCase().replace(/\s/g, '')}.com` : planeImg }
            onError={e => e.target.src = planeImg}
            alt={Op}
          />
          
          <div className="data-row">
            <strong>ID</strong>:
            <span>{Id || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>From</strong>:
            <span>{From || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>To</strong>:
            <span>{To || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>Country</strong>:
            <span>{Cou || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>Manufacturer</strong>:
            <span>{Man || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>Type</strong>:
            <span>{Type || 'Not Available'}</span>
          </div>
          <div className="data-row">
            <strong>Year</strong>:
            <span>{Year || 'Not Available'}</span>
          </div>

          <Link to="/">Back to all aircrafts</Link>
        </div>
      );
    }}
  </Consumer>
);

export default SingleAircraftPage;