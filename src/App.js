import React, { Component } from 'react';
import './App.css';

import Map from './components/Map'

class App extends Component {
	state = {
		allLocations: [],
		search: "",
		select: "all",
		highlight: 0
	}

	componentDidMount(){
		fetch('./db/locations.json', {
	      headers : {
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	       }
	    })
			.then(data => data.json())
			.then(result => {
				this.setState({allLocations: result })
				return result
		})
	}

	setHighlight = (num) => this.setState({highlight: num})

  render() {
		const { highlight, allLocations, search, select } = this.state

		let showing = (allLocations === undefined || allLocations.length === 0)?[]:
			allLocations
			.filter(loc => loc.name.includes(search.trim()))
			.filter(loc => ((loc.category === select || select === "all")))

		return (
			<main className="App">
				<nav className="Menu">
					<div className="container">
						<header>
							<img
								className="menuHamburger"
								src="images/hamburger.png"
								alt="Menu hamburger button"
								onClick={()=>(
									document.getElementsByClassName("Menu")[0].classList.toggle("active")
								)}
							/>
							<a href="/">
								<img
									className="logo"
									src="images/logo.png"
									alt="The logo for the ReaCT app"
								/>
							</a>
						</header>
						<section className="infobox">
							<p>
								{`ReaCT is a map of some of the most interesting places to visit in Catania (CT).
									The app is developed using the React JS framework.`}
							</p>
						</section>
						<div>
							<div className="menuFilter">
								<div className="markerSearch">
									<h3>Search:</h3>
									<input
										type="text"
										placeholder="Search location"
										value={search}
										onChange={(event)=>(this.setState({search: event.target.value}))}
									/>
								</div>
								<div className="markerCategory">
									<h3>Type:</h3>
									<select
										value={select}
										onChange={(event)=>(this.setState({select: event.target.value}))}
									>
										<option value="all">All</option>
										<option value="SQUARE">Squares</option>
										<option value="MONUMENT">Monuments</option>
										<option value="MUSEUM">Museums</option>
										<option value="BUILDING">Buildings</option>
									</select>
								</div>
							</div>
							<div className="menuList">
								<h3>Locations:</h3>

									{
										(showing === undefined || showing.length === 0)
										?
										<div> No results found! </div>
										:
										<ul>
										{
											showing.map(loc => (
											<li
											key={loc.id}
											className={loc.id === highlight ? "highlight" : ""}
											onClick={()=>{this.setHighlight(loc.id)}}
											>
												<a>
													<h2>{loc.name}</h2>
												</a>
											</li>
											))
										}
										</ul>
									}
							</div>
						</div>
					</div>
				</nav>
				<Map
					locations={showing}
					highlight={highlight}
					func={this.setHighlight}
				/>
      </main>
    )
  }
}

export default App;
