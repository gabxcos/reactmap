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
			<main className="App" tabIndex="1" aria-label="ReaCT web app" aria-describedby="infobox">
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
									alt="The logo for the ReaCT app, click to refresh the page"
								/>
							</a>
						</header>
						<section id="infobox">
							<p>
								{`ReaCT is a map of some of the most interesting places to visit in Catania (CT).
									The app is developed using the React JS framework.`}
							</p>
						</section>
						<div>
							<div className="menuFilter">
								<label className="aria-invisible" tabIndex="1" id="filter-label">Filter the locations</label>
								<div className="markerSearch">
									<h3 htmlFor="filterInput">Search:</h3>
									<input
										id="filterInput"
										type="text"
										placeholder="Search location"
										value={search}
										onChange={(event)=>(this.setState({search: event.target.value}))}
										aria-describedby="filter-label"
									/>
								</div>
								<div className="markerCategory">
									<h3 htmlFor="filterSelect">Category:</h3>
									<select
										id="filterSelect"
										value={select}
										onChange={(event)=>(this.setState({select: event.target.value}))}
										aria-describedby="filter-label"
									>
										<option value="all">All categories</option>
										<option value="SQUARE">Squares</option>
										<option value="MONUMENT">Monuments</option>
										<option value="MUSEUM">Museums</option>
										<option value="BUILDING">Buildings</option>
									</select>
								</div>
							</div>
							<div id="menuList" tabIndex="1" role="list" aria-label="List of all locations">
								<h3>Locations:</h3>

									{
										(showing === undefined || showing.length === 0)
										?
										<div tabIndex="1" aria-label="Warning! The query gave no results. Change the input or refresh the page"> No results found! </div>
										:
										<ul>
										{
											showing.map(loc => (
											<li
											key={loc.id}
											className={loc.id === highlight ? "highlight" : ""}
											>
												<a
													href="#"
													onClick={()=>{
														this.setHighlight(loc.id)
													}}
												>
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
