import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

import MapMarker from './MapMarker'

/* Styles generated using the Google Maps APIs Styling Wizard:
 * https://mapstyle.withgoogle.com/ */
const mapStyles = require("./MapStyles.json")

class Map extends Component {

	shouldComponentUpdate(nextProps, nextState){
		return (this.props.highlight !== nextProps.highlight || this.props.locations === undefined || this.props.locations.length === 0)
	}

	fitMap = (map) => {
			let bounds = new window.google.maps.LatLngBounds(), locations = this.props.locations
			locations.forEach(loc=>{
				bounds.extend(new window.google.maps.LatLng(loc.lat,loc.lng))
			})
			map.fitBounds(bounds)
	}

	render(){
		const { locations, highlight, func } = this.props

		const GoogleMapWrapper = withScriptjs(withGoogleMap(props => (
			 <GoogleMap
				 ref={map => map && (()=>{
					 this.fitMap(map)
				 })()}
				 defaultCenter = { { lat: 37.49, lng: 15.01 } }
				 defaultZoom = { 13 }
				 defaultOptions = {{gestureHandling: "none",disableDefaultUI: true,
				 styles: mapStyles
			 	}}
			 >
			 { locations.map(loc => (
				 <MapMarker
					 key={loc.name}
					 highlight={loc.id === highlight ? true : false}
					 loc={loc}
					 func={func}
				 />
			 ))}
			 </GoogleMap>
		)));

		return (
			<GoogleMapWrapper
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPd4HcMgw5Xkiv-LAbAm5Mr6XdQMx1Vfg&v=3.exp"
				loadingElement={<div className="loader" style={{ height: '100vh', width: '100%' }}/>}
				containerElement={ <section className="Map" style={{ height: '100vh', width: '100%' }} role="application"/> }
				mapElement={ <div style={{ height: `100%` }} /> }
			/>
		)

	}
}

export default Map