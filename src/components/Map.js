import React, { Component } from "react";
/* Thanks to Tom Chen for providing an easy-to-use React component to include Google Maps' API:
 * https://tomchentw.github.io/react-google-maps/ */
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import MapMarker from "./MapMarker";

/* Styles generated using the Google Maps APIs Styling Wizard:
 * https://mapstyle.withgoogle.com/ */
const mapStyles = require("./MapStyles.json");

class Map extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* The map solely updates if a marker or a list item has been clicked:
		 * this is to avoid useless re-renderings, as the map rendering and fitBounds
		 * operations are quite expensive and could render the use of the filter elements
		 * a real pain and a laggy experience */
    return (
      this.props.highlight !== nextProps.highlight ||
      this.props.locations === undefined ||
      this.props.locations.length === 0
    );
  }
  /* This function fits the map to wrap around the visible markers and contain them all */
  fitMap = map => {
    let bounds = new window.google.maps.LatLngBounds(),
      locations = this.props.locations;
    if (locations !== undefined || locations !== null || locations.length > 0) {
      locations.forEach(loc => {
        bounds.extend(new window.google.maps.LatLng(loc.lat, loc.lng));
      });
      map.fitBounds(bounds);
    }
  };
  render() {
    const { locations, highlight, func } = this.props;
    /* This is the suggested way to initialize this component, as
		 * in Tom Chen's example usage of his API */
    const GoogleMapWrapper = withScriptjs(
      withGoogleMap(props => (
        /* UI and gestures are disabled from the map, as they can only provide confusion */
        <GoogleMap
          ref={map =>
            map &&
            (() => {
              this.fitMap(map);
            })()
          }
          defaultCenter={{ lat: 37.49, lng: 15.01 }}
          defaultZoom={13}
          defaultOptions={{
            gestureHandling: "none",
            disableDefaultUI: true,
            styles: mapStyles
          }}
        >
          {/* For each location, a Marker is rendered on the map. The marker also know if it's linked to the highlighted location or not */}
          {locations.map(loc => (
            <MapMarker
              key={loc.name}
              highlight={loc.id === highlight ? true : false}
              loc={loc}
              func={func}
            />
          ))}
        </GoogleMap>
      ))
    );

    return (
      <GoogleMapWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPd4HcMgw5Xkiv-LAbAm5Mr6XdQMx1Vfg&v=3.exp"
        loadingElement={
          <div className="loader" style={{ height: "100vh", width: "100%" }} />
        }
        containerElement={
          <section
            className="Map"
            style={{ height: "100vh", width: "100%" }}
            role="application"
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
