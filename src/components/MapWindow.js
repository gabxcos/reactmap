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
				<div className="wikiInfo" dangerouslySetInnerHTML={{__html: message}}></div>
			</InfoBox>
		)
	}
}

export default MapWindow