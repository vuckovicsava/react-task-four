import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import FlightList from './FlightList';

class App extends Component {

  state = {
    lat: '',
    lng: '',
    flights: [],
    error: false,
    fetching: false
  }

  getGeolocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // set lat & lng once the user allows access to geolocation and call the API
        this.setState(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }, 
          () => this.getFlights()
        );
      }, err => this.setState({ error: 'Geolocation has to be enabled in order to get flights data ' }));
    } else {
      this.setState({ error: 'Geolocation is not supported by your browser.' });
    }
  }

  getFlights = () => {
    const URL = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.state.lat}&lng=${this.state.lng}&fDstL=0&fDstU=1000`;
    this.setState({ fetching: true });
    axios.get(URL)
      .then(res => res.data)
      .then(data => {
        console.log(data); // inspect the data | REMOVE LATER
        // put the flight data to state and end fetching
        this.setState({
          flights: data.acList,
          fetching: false
        });
      })
      .catch(() => this.setState({ error: 'An error occured while fetching data' }));

    // getFlights() will call itself every 60 seconds to reload data
    // setTimeout(this.getFlights, 60000);
  }
 
  render() {
    return (
      <div className="App">
        <h1>React Task Four</h1>
        <p>{ this.state.error }</p>
        <button onClick={this.getGeolocationData}>Get Flights</button>

        <hr/>

        { 
          this.state.fetching 
            ? <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.fetching}
              /> 
            : <FlightList flights={this.state.flights}/> 
        }
      </div>
    );
  }
}

export default App;
