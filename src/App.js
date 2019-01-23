import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import AircraftList from './AircraftList';

class App extends Component {

  state = {
    lat: '',
    lng: '',
    allAircrafts: [],
    shownAircrafts: [],
    error: false,
    fetching: false,
    activePage: 1
  }

  getGeolocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }, 
          () => this.getAircraftList()
        );
      }, err => this.setState({ error: 'Geolocation has to be enabled in order to get flights data ' }));
    } else {
      this.setState({ error: 'Geolocation is not supported by your browser.' });
    }
  }

  getAircraftList = () => {
    const URL = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.state.lat}&lng=${this.state.lng}&fDstL=0&fDstU=1000`;
    this.setState({ fetching: true });
    axios.get(URL)
      .then(res => res.data)
      .then(data => {
        console.log(data); // inspect the data | REMOVE LATER
        this.setState({
          allAircrafts: data.acList,
          fetching: false
        });
      })
      .catch(() => this.setState({ error: 'An error occured while fetching data' }));

    // setTimeout(this.getAircraftList, 60000);
  }

  handlePageChange = (number) => {
    console.log(number);
  }
 
  render() {
    return (
      <div className="App">
        <h1>React Task Four</h1>
        <p>{ this.state.error }</p>
        <button onClick={this.getGeolocationData}>Get Aircrafts</button>

        <hr/>

        { 
          this.state.fetching 
            ? <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.fetching}
              /> 
            : <AircraftList aircrafts={this.state.shownAircrafts}/> 
        }

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={15}
          totalItemsCount={this.state.allAircrafts.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          firstPageText="First"
          lastPageText="Last"
          prevPageText="Prev"
          nextPageText="Next"
        />
      </div>
    );
  }
}

export default App;
