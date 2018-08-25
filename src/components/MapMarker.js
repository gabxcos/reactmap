import React, { Component } from "react";
import { Marker } from "react-google-maps";

import MapWindow from "./MapWindow";

class MapMarker extends Component {
  /* Focus for screen readers is tested at every mount/update */
  componentDidMount() {
    this.setFocus();
  }
  componentDidUpdate() {
    this.setFocus();
  }
  /* If the marker is highlighted, it waits for its InfoBox to render and focuses it */
  setFocus = () => {
    const { highlight, loc } = this.props;
    if (highlight) {
      let box = document.getElementById(`infoBox${loc.id}`);
      if (box === undefined || box == null) setTimeout(this.setFocus, 500);
      else box.focus();
    }
  };
  render() {
    const { loc, highlight, func } = this.props;

    let message = "";
    /* Only renders the InfoBox if the marker is highlighted */
    if (highlight) {
      message = <MapWindow loc={loc} />;
    }
    return (
      /* The marker is animated when highlighted, and on click it gets highlighted if it wasn't */
      <Marker
        tabIndex="0"
        aria-label={`Map marker for ${loc.name}`}
        position={{ lat: loc.lat, lng: loc.lng }}
        animation={highlight ? window.google.maps.Animation.BOUNCE : ""}
        onClick={() => {
          func(loc.id);
        }}
      >
        {message}
      </Marker>
    );
  }
}

export default MapMarker;
