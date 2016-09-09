import React, {Component} from 'react';

import GoogleMap from 'google-map-react';

export default class SimpleMapPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const style = {
		width: '600px',
		height: '300px'
	}

	return (
			<div style={style}> 
				<GoogleMap
					apiKey={ process.env.google_maps_api_key }
					center={ [34.019325, -118.494809] }
					zoom={9}>
				</GoogleMap>
			</div>
		);
	}
}