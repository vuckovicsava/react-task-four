import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    allAircrafts: [],
    shownAircrafts: [],
    activeAircraft: null,
    lat: null,
    lng: null,
    fetching: false,
    error: '',
    activePage: 1,
    itemsPerPage: 15,
    pageRangeDisplayed: 5
  }

  // get all aircrafts from the API
  getAircraftList = () => {
    const URL = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${this.state.lat}&lng=${this.state.lng}&fDstL=0&fDstU=1000`;
    this.setState({ fetching: true });
    axios.get(URL)
      .then(res => res.data)
      .then(data => {
        const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        
        this.setState({ 
          allAircrafts: data.acList,
          shownAircrafts: data.acList.slice(indexOfFirstItem, indexOfLastItem),
          fetching: false
        });
      })
      .catch(() => this.setState({ error: 'An error occured while fetching data, please try again later' }));
  }

  // get lat & lng from the user, make the API call is successful, otherwise show error
  getGeolocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }, 
          () => {
            this.getAircraftList();
            // setInterval(this.getAircraftList, 60000);
          }
        );
      }, err => this.setState({ error: 'Geolocation has to be enabled in order to get flights data ' }));
    } else {
      this.setState({ error: 'Geolocation is not supported by your browser.' });
    }
  }

  // handle the pagination change
  handlePageChange = number => {
    this.setState({ activePage: number }, () => {
      const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
      
      this.setState({ shownAircrafts: this.state.allAircrafts.slice(indexOfFirstItem, indexOfLastItem) })
    });
  }

  render() {
    const contextValue = {
      ...this.state,
      getGeolocationData: this.getGeolocationData,
      handlePageChange: this.handlePageChange
    };

    return (
      <Context.Provider value={contextValue}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;