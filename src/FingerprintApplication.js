import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from './FingerprintPopup';

const impetus_lat = 28.539583;
const impetus_lon = 77.401989;

class FingerprintApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      popupShowed: false,
      welcomeMessage: false,
      message: '',

    };
    this.calcArea = this.calcArea.bind(this);
    this.checkLocation = this.checkLocation.bind(this);

  }

  // deg2rad (deg) {
  //   return deg * (Math.PI / 180)
  // }
  error_id = (msg, msgType) => {
    this.setState({ welcomeMessage: msg, message: msgType });
  };

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
  };

  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false });
  };

  calcArea(lat, lon) {
    console.log('LAT 1 LON 1....', lat, lon);
    console.log('LAT 2 LON 2....', impetus_lat, impetus_lon);
    var R = 6371e3; // Radius of the earth in m
    var dLat = (lat - impetus_lat) * (Math.PI / 180);  // deg2rad below
    var dLon = (lon - impetus_lon) * (Math.PI / 180)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((impetus_lat) * (Math.PI / 180)) * Math.cos((lat) * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c); // Distance in m

    console.log('Distance....', d);

    if (d > 200) {
      console.log('Distance....', d);
      this.error_id(true, 'You are not in Impetus campus, try when in area');
    } else {
      console.log('Distance....', d);
      this.error_id(true, 'Welcome To Impetus');
    }
  }

  checkLocation() {
    var latitude = null;
    var longitude = null;
    console.log('Check Distance....');
    navigator.geolocation.getCurrentPosition(
      (position, calcArea) => {
        console.log('............');
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        error = null;
        this.calcArea(latitude, longitude);
      },
      (error) => this.setState({ error: error.message }),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


  }



  componentDidMount() {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => this.setState({ errorMessage: error.message }));
    this.handleFingerprintShowed();
  }

  render() {

    const { errorMessage, popupShowed } = this.state;

    return (
      <View style={styles.container}>


        {
          this.state.errorMessage &&
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>

        }

        {
          this.state.welcomeMessage &&
          <Text>
            {this.state.message}
          </Text>
        }

        {popupShowed && (
          <FingerprintPopup
            handlePopupDismissed={this.handleFingerprintDismissed}
            checkLocation={this.checkLocation}
          />
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FingerprintApplication;