import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    lat: '',
    lng: '',
    error: false,
    flights: [],
    fetching: false
  }

  getGeolocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // this.setState({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // })
        this.makeAPICall(position.coords.latitude, position.coords.longitude);
      }, err => {
        console.log(err);
        this.setState({ error: 'Geolocation has to be supported ' })
      });
    } else {
      this.setState({ error: 'Geolocation is not supported by your browser.' });
    }
  }

  makeAPICall = (lat, lng) => {
    const URL = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=1000`;
    this.setState({ fetching: true });
    axios.get(URL)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        this.setState({
          flights: data.acList,
          fetching: false
        })
      })
      .catch(error => this.setState({ error }))
  }

  renderFlights = () => {
    return this.state.flights.map(flight => (
      <ul key={flight.Id}>
        <li>{flight.Id}</li>
        <li>{flight.Lat}</li>
        <li>{flight.Long}</li>
        <li>{flight.Op}</li>
        <li>{flight.Mdl}</li>
      </ul>
    ))
  }
 
  render() {
    return (
      <div className="App">
        <h1>React Task Four</h1>
        <p>{ this.state.error }</p>

        <button onClick={this.getGeolocationData}>Get Flights</button>
        <h1>{null}</h1>

        <hr/>
        {
          this.state.fetching ? <div>FETCHING</div> : this.renderFlights() 
        }
      </div>
    );
  }
}

export default App;
