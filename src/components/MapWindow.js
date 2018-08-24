import React, {Component} from 'react'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import * as WikiAPI from '../utils/WikiAPI'

class MapWindow extends Component {
	state = {
		message: "Loading..."
	}

	render(){
		const { loc } = this.props
		const { message } = this.state
		WikiAPI.getWiki(loc.pageid).then(extract => this.setState({message: extract}))

		return (
			<InfoBox
				defaultPosition={new window.google.maps.LatLng(loc.lat,loc.lng)}
				options={{ closeBoxURL: ``, enableEventPropagation: true, maxWidth: 450}}
			>
				<div id={`#infoBox${loc.id}`} tabIndex="1" aria-label={`You are on an InfoBox for ${loc.name}`}>
					<a href="#menuList" tabIndex="1" aria-label="Go back to the menu, following is a Wikipedia extract" className="aria-invisible"/>
					<label aria-describedby={`wikiBox${loc.id}`}>{`Wikipedia extract on ${loc.name}`}</label>
					<div className="wikiInfo" tabIndex="1" id={`wikiBox${loc.id}`} dangerouslySetInnerHTML={{__html: message}}></div>
				</div>
			</InfoBox>
		)
	}
}

export default MapWindow