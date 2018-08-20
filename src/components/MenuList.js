import React, { Component } from 'react'

class MenuList extends Component {
	render(){
		return (
			<div className="menuList">
				<h3>Locations:</h3>
				<ul>
					<li>
						<a href="/"><h2>Piazza Teatro</h2></a>
					</li>
					<li>
						<a href="/"><h2>Piazza Duomo</h2></a>
					</li>
					<li>
						<a href="/"><h2>Cattedrale</h2></a>
					</li>
					<li>
						<a href="/"><h2>Palazzo della Cultura</h2></a>
					</li>
					<li>
						<a href="/"><h2>Mercato del Pesce</h2></a>
					</li>
					<li>
						<a href="/"><h2>Villa Bellini</h2></a>
					</li>
					<li>
						<a href="/"><h2>Quattro Canti</h2></a>
					</li>
				</ul>
			</div>
		)
	}
}

export default MenuList