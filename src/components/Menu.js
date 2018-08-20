import React, { Component } from 'react'

import MenuFilter from './MenuFilter'
import MenuList from './MenuList'

class Menu extends Component {
	render(){
		return (
			<nav className="Menu">
				<div className="container">
					<header>
						<img
							className="menuHamburger"
							src="images/hamburger.png"
							onClick={()=>(
								document.getElementsByClassName("Menu")[0].classList.toggle("active")
							)}
						/>
						<a href="/"><img className="logo" src="images/logo.png"/></a>
					</header>
					<section className="infobox">
						<p>
							{`ReaCT is a map of some of the most interesting places to visit in Catania (CT).
								The app is developed using the React JS framework.`}
						</p>
					</section>
					<MenuFilter />
					<MenuList />
				</div>
			</nav>
		)
	}
}

export default Menu