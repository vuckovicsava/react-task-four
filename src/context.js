import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    allAircrafts: [],
    shownAircrafts: [],
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
        console.log(data); // inspect the data | REMOVE LATER
        this.setState({
          allAircrafts: data.acList,
          fetching: false
        });
      })
      .catch(() => this.setState({ error: 'An error occured while fetching data' }));
  }

  // get lat & lng from the user
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

  // decide which subset of all aircrafts is shown based on which page is active
  setActivePage = number => {
    const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const shownAircrafts = this.state.allAircrafts.slice(indexOfFirstItem, indexOfLastItem);
    
    this.setState({ 
      activePage: number,
      shownAircrafts
    });
  }

  render() {
    const contextValue = {
      ...this.state,
      // getAircraftList: this.getAircraftList,  || DECIDE WHAT TO DO WITH THIS LATER
      getGeolocationData: this.getGeolocationData,
      setActivePage: this.setActivePage
    };

    return (
      <Context.Provider value={contextValue}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;