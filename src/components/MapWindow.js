import React, { Component } from "react";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
/* It takes the function to fetch a Wikipedia extract from an API */
import * as WikiAPI from "../utils/WikiAPI";

class MapWindow extends Component {
  /* A dummy message to show while the fetch is still in progress */
  state = {
    message: "Loading..."
  };
  /* On component mounted, it fetches and extract from Wikipedia for the related location */
  componentDidMount() {
    WikiAPI.getWiki(this.props.loc.pageid).then(extract =>
      this.setState({ message: extract })
    );
  }
  render() {
    const { loc } = this.props;
    const { message } = this.state;
    return (
      /* InfoBox is taken from Tom Chen's `react-google-maps` */
      <InfoBox
        defaultPosition={new window.google.maps.LatLng(loc.lat, loc.lng)}
        options={{
          closeBoxURL: ``,
          enableEventPropagation: true,
          maxWidth: 450
        }}
      >
        {/* The infobox's contents include a link to let screen reader's users go back to the locations list */}
        <div
          id={`#infoBox${loc.id}`}
          tabIndex="0"
          aria-label={`You are on an InfoBox for ${loc.name}`}
        >
          <a href="#menuList" tabIndex="0" className="aria-invisible">
            Go back to the menu, following is a Wikipedia extract
          </a>
          <label
            aria-describedby={`wikiBox${loc.id}`}
            className="aria-invisible"
          >{`Wikipedia extract on ${loc.name}`}</label>
          <div
            className="wikiInfo"
            tabIndex="0"
            id={`wikiBox${loc.id}`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      </InfoBox>
    );
  }
}
export default MapWindow;
