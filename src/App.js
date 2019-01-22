import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    lat: '',
    lng: '',
    error: false,
    flights: []
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
    // fetch(URL)
    //   .then(res => res.json())
    //   .then(results => console.log(results))
    //   .catch(err => console.log(err));
    axios.get(URL)
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(error => this.setState({ error }))
  }
 
  render() {
    return (
      <div className="App">
        <h1>React Task Four</h1>
        <p>{ this.state.error }</p>

        <button onClick={this.getGeolocationData}>Get Flights</button>
        <h1>{null}</h1>
      </div>
    );
  }
}

export default App;
