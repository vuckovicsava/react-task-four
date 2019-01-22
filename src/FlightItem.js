import React from 'react';

const FlightItem = ({ flight }) => {
  const { Id, Op } = flight;
  return (
    <tr>
      <td>Flight ID: {Id}</td>
      <td>
        <img 
          src={Op ? `https://logo.clearbit.com/${Op.toLowerCase().replace(/\s/g, '')}.com` : 'https://via.placeholder.com/100' }
          onError={e => e.target.src = 'https://via.placeholder.com/100'}
          alt={Op}
        />
      </td>
    </tr>
  )
}

export default FlightItem;