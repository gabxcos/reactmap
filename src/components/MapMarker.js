import React, {Component} from 'react'
import { Marker } from 'react-google-maps'

import MapWindow from './MapWindow'

class MapMarker extends Component {

	componentDidMount(){
		this.setFocus()
	}

	componentDidUpdate(){
		this.setFocus()
	}

	setFocus = () => {
		const { highlight, loc } = this.props
		if(highlight){
			let box = document.getElementById(`#infoBox${loc.id}`)
			if(box === undefined || box == null) setTimeout(this.setFocus, 500)
			else box.focus()
		}
	}

	render(){
		const { loc, highlight, func } = this.props

		let message = ""
		if(highlight){
			message = <MapWindow loc={loc}	/>
		}




		return (
			<Marker
				tabIndex="1"
				aria-label={`Map marker for ${loc.name}`}
				position={{ lat: loc.lat, lng: loc.lng }}
				animation={ highlight ? window.google.maps.Animation.BOUNCE : ""}
				onClick={()=>{func(loc.id)}}
			>
				{message}
			</Marker>
		)
	}
}

export default MapMarker