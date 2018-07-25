import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from './FingerprintPopup';

class FingerprintApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      popupShowed: false,
      welcomeMessage: false,
      message: '',
      latitude: null,
      longitude: null,

    };
  }

  error_id = (msg, msgType) => {
    this.setState({ welcomeMessage: msg, message: msgType });
  };

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
  };

  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false });
  };

  checkLocation = () => {
    var lat2 = 0;
    var lon2 = 0;
    console.log('Check Distance....');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat2 = position.coords.latitude;
        lon2 = position.coords.longitude;
        error = null;
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    var lat1 = 28.539583;
    var lon1 = 77.401989;
    var R = 6371e3; // Radius of the earth in m
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c); // Distance in m
    
    console.log('Distance....', d);

    if (d > 200) {
      console.log('Distance....', d);
      this.error_id(false, 'You are not in Impetus campus, try when in area');
    } else {
      console.log('Distance....', d);
      this.error_id(true, 'Welcome To Impetus');
    }
  };

  deg2rad= (deg) => {
    return deg * (Math.PI/180)
  };

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
          this.state.errorMessage ?
            <Text style={styles.errorMessage}>
              {this.state.message}
            </Text> :
            <Text style={styles.errorMessage}>
              {this.state.message}
            </Text>

        }

        {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
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
    textAlign: 'center',
  }
});

export default FingerprintApplication;