import React from 'react';

const AircraftItem = ({ aircraft }) => {
  const { Id, Op, Cou, Year, Man } = aircraft;

  return (
    <tr>
      <td>{Id}</td>
      <td>
        <img 
          src={Op ? `https://logo.clearbit.com/${Op.toLowerCase().replace(/\s/g, '')}.com` : 'https://via.placeholder.com/100' }
          onError={e => e.target.src = 'https://via.placeholder.com/100'}
          alt={Op}
        />
      </td>
      <td>{Cou || 'Not Available'}</td>
      <td>{Year || 'Not Available'}</td>
      <td>{Man || 'Not Available'}</td>
    </tr>
  );
}

export default AircraftItem;