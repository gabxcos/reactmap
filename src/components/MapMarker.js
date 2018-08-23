import React, {Component} from 'react'
import { Marker } from 'react-google-maps'

import MapWindow from './MapWindow'

class MapMarker extends Component {
	render(){
		const { loc, highlight, func } = this.props
		return (
			<Marker
				position={{ lat: loc.lat, lng: loc.lng }}
				onClick={()=>{func(loc.id)}}
			>
				{highlight && <MapWindow loc={loc}	/>}
			</Marker>
		)
	}
}

export default MapMarker