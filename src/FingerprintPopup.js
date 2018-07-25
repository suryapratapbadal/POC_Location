import React, { Component, PropTypes } from 'react';
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

class FingerprintPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        this.props.handlePopupDismissed();
        console.log('Ok Print....');
        this.props.checkLocation();

      })
      .catch((error) => {
        this.props.handlePopupDismissed();
      });
  }

  

  render() {
    return false;
  }
}

// FingerprintPopup.propTypes = {
//   handlePopupDismissed: PropTypes.func.isRequired,
// };

export default FingerprintPopup;