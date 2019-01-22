import React, { Component } from 'react';

class App extends Component {

  state = {
    lat: '',
    lng: '',
    notSupported: false
  }

  getGeolocationData = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        // this.setState({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // })
        this.makeAPICall(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.setState({ error: true });
    }
  }

  makeAPICall = (lat, lng) => {
    const URL = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=1000`;
    fetch(URL)
      .then(res => res.json())
      .then(results => console.log(results))
      .catch(err => console.log(err));
  }
 
  render() {
    return (
      <div className="App">
        <h1>React Task Four</h1>
        { this.state.error && <h1>Geolocation not supported</h1> }

        <button onClick={this.getGeolocationData}>Make API request</button>
      </div>
    );
  }
}

export default App;
