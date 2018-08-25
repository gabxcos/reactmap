import React, { Component } from "react";
import "./App.css";

import Map from "./components/Map";

/* This component represents the full body of the single-page React app.
 * Google Maps functionalities and components are moved into the `components` folder */
class App extends Component {
  /* State includes:
	 - allLocations: array to hold all the locations from the fetch operation
	 - search and select: the queries to filter the locations
	 - highlight: the id of the highlighted location, initialized to a dummy unused value
	 - gmapsStatus: this variable lets the component know what to render depending on whether the
	 	 Google Maps script loaded or if there was an error
	 */
  state = {
    allLocations: [],
    search: "",
    select: "all",
    highlight: 0,
		gmapsStatus: 'loading'
  };

  componentDidMount() {
		/* This block adds the Google Maps script and listens for script loading and errors */
		new Promise(function(resolve, reject){
			let script = document.createElement('script')
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPd4HcMgw5Xkiv-LAbAm5Mr6XdQMx1Vfg&v=3.exp`
			script.async = true
			script.addEventListener('load', ()=>(resolve()))
			script.addEventListener('error', ()=>(reject()))
			document.body.appendChild(script)
		})
		.then(()=>(this.setState({'gmapsStatus': 'done'})))
		.catch(()=>{
			this.setState({'gmapsStatus': 'error'})
			this.setErrorFocus()
		})

		/* This block fetches the locations from a JSON file acting as the database */
    fetch("./db/locations.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(data => data.json())
      .then(result => {
        this.setState({ allLocations: result });
        return result;
      });
  }

	/* This function sets the app contents depending on the load-state of the map */
	setMapContent = (status) => {
		switch(status){
			case 'loading':
				return <div className="Map" id="loading">
					<div>
						<span>Loading...</span>
					</div>
				</div>
			case 'error':
			default:
				return <div className="Map" id="error" tabIndex="0" aria-describedby="errorMessage">
						<div id="errorMessage">
							<p className="errorHeading">There was an error!</p>
							<p>{'There was an error with the API or the app took too much time to load. Please check your connection and refresh.'}</p>
						</div>
				</div>
			}
		}

	/* This function sets focus on the error message as soon as it is loaded, for screen reader users */
	setErrorFocus = () => {
    	let error = document.getElementById(`error`);
      if (error === undefined || error == null) setTimeout(this.setErrorFocus, 500);
      else error.focus();
    }

  setHighlight = num => this.setState({ highlight: num });

  render() {
    const { highlight, allLocations, search, select, gmapsStatus } = this.state;
		/* The app waits 30s before deciding there was an un-caught error with the script loading */
		setTimeout(()=>
		{
			if(this.state.gmapsStatus==='loading'){
			 this.setState({gmapsStatus: 'error'})
			 this.setErrorFocus()
		 	}
		},30000)
    /* Filters the array according to the queries, uses an empty array while the App is still fetching */
    let showing =
      allLocations === undefined || allLocations.length === 0
        ? []
        : allLocations
            .filter(loc => loc.name.includes(search.trim()))
            .filter(loc => loc.category === select || select === "all");

    return (
      /* First element in the accessibility tree, provides a fast description */
      <main
        className="App"
        tabIndex="0"
        aria-label="ReaCT web app"
        aria-describedby="infobox"
      >
        <nav className="Menu">
          <div className="container">
            <header>
              {/* A hamburger icon to access the menu on mobile devices */}
              <img
                className="menuHamburger"
                src="images/hamburger.png"
                alt="Menu hamburger button"
                onClick={() =>
                  document
                    .getElementsByClassName("Menu")[0]
                    .classList.toggle("active")
                }
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
              {/* The query group to filter the locations, both with an input and a combobox */}
              <div className="menuFilter">
                <label
                  className="aria-invisible"
                  tabIndex="0"
                  id="filter-label"
                >
                  Filter the locations
                </label>
                <div className="markerSearch">
                  <h3 htmlFor="filterInput">Search:</h3>
                  <input
                    id="filterInput"
                    type="text"
                    placeholder="Search location"
                    value={search}
                    onChange={event =>
                      this.setState({ search: event.target.value })
                    }
                    aria-describedby="filter-label"
                  />
                </div>
                <div className="markerCategory">
                  <h3 htmlFor="filterSelect">Category:</h3>
                  <select
                    id="filterSelect"
                    value={select}
                    onChange={event =>
                      this.setState({ select: event.target.value })
                    }
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
              <div
                id="menuList"
                tabIndex="0"
                role="list"
                aria-label="List of all locations"
              >
                <h3>Locations:</h3>
                {/* The list provides a warning message if it's empty, due to async fetching or invalid queries */}
                {/* Otherwise, it maps the array and applies different visuals to the eventual highlighted item */}
                {showing === undefined || showing.length === 0 ? (
                  <div
                    tabIndex="0"
                    aria-label="Warning! The query gave no results. Change the input or refresh the page"
                  >
                    {" "}
                    No results found!{" "}
                  </div>
                ) : (
                  <ul>
                    {showing.map(loc => (
                      <li
                        key={loc.id}
                        className={loc.id === highlight ? "highlight" : ""}
                      >
                        <a
                          href={`#infoBox${loc.id}`}
                          onClick={() => {
                            this.setHighlight(loc.id);
                          }}
                        >
                          <h2>{loc.name}</h2>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* The Map component and its children, all in the `components` folder. The Map uses only the showing locations from the filtering */}
				{
					gmapsStatus === 'done' ?
					<Map
						locations={showing}
						highlight={highlight}
						func={this.setHighlight}
					/>
					:
					this.setMapContent(gmapsStatus)
				}
      </main>
    );
  }
}

export default App;
