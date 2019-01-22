import React, { Component } from 'react';
import axios from 'axios';

export default class FlightList extends Component {

  getCompanyLogo = companyName => {
    if (!companyName) return 'https://via.placeholder.com/100';
    axios.get(`https://cors-anywhere.herokuapp.com/https://logo.clearbit.com/${companyName.toLowerCase()}.com`)
      // .then(res => res.data)
      .then(res => 'http://logo.clearbit.com/facebook.com')
      .catch(err => 'https://via.placeholder.com/100');
  }
  
  renderTableRows = () => {
    return this.props.flights.map(flight => {
      // const logo = flight.Op ? this.getCompanyLogo(flight.Op.toLowerCase()) : 'https://via.placeholder.com/100';
      return (
        <tr key={flight.Id}>
          <td>ID: {flight.Id}</td>
          <img src={`http://logo.clearbit.com/${flight.Op}.com`} alt=""/>
        </tr>
      )
    });
  }
  // <td><img src={logo} alt={flight.Id}/></td>

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th> 
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}