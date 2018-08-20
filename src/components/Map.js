import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <section
				className="Map"
				style={{ height: '100vh'}}
				role="application"
			>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDPd4HcMgw5Xkiv-LAbAm5Mr6XdQMx1Vfg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </section>
    );
  }
}

export default Map;