import React, { Component } from 'react'

class MenuFilter extends Component {
	render(){
		return (
			<div className="menuFilter">
				<div className="markerSearch">
					<h3>Search:</h3>
					<input
						type="text"
						placeholder="Search location"
					/>
				</div>
				<div className="markerCategory">
					<h3>Type:</h3>
					<select>
						<option value="all" selected>All</option>
						<option value="square">SQUARES</option>
						<option value="monument">MONUMENTS</option>
						<option value="museum">MUSEUMS</option>
						<option value="church">CHURCHES</option>
					</select>
				</div>
			</div>
		)
	}
}

export default MenuFilter