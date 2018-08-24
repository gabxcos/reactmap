# ReaCT - A journey through Catania in React

This is the last project for Udacity's FEWD Nanodegree, which requires to make use of all knowledge gathered in the course.
I decided to build a map of some of the most interesting locations in my city, Catania - in short CT, thus the play on words-, following the project's [Rubric](https://review.udacity.com/#!/rubrics/1351/view).

## Functionalities

The user will find a menu (either on the left side or on popup, depending on the device) which lists:
- the logo app
- a box with a description on the app
- some tools to filter the locations
- a list of said locations

All the locations are also shown as markers on a map, loaded with the `Google Maps API` through the `react-google-maps` library (see Credits).
Clicking on either a menu item or a map marker will highlight them (respectively, with a style change or an animation) and popup an infoWindow on the map, with an excerpt on the location taken from `Wikipedia` (italian version) with fetch requests.

## How to test
This app can be easily tested in 3 steps:
1. Clone this repository on your machine, open the terminal and `cd` into its folder
2. run `npm install`
3. run `npm start`

The app will be available on your browser at address `localhost:3000`

## Components structure
The following tree structure is a preview of the parent-children relations for the React components
```bash
├── App
│   ├── Map
│       ├── MapMarker
│           ├── MapWindow
```
The structure was left quite simple for the sake of handling as few components' states as possible.

## Project Rubric Checks
1. Interface Design: is the app usable and responsive?
    - Check: the app changes design for mobile devices and each element is easily clickable if needed
2. Application Functionality: are all the bare minimum functions implemented?
    - Check: menu, markers, filtering functions are all implemented and working and they interact with each other
3. Asynchronous Data Usage: are the app functionalities async?
    - Check: the app renders dummy content while the requests are still pending
4. Documentation: is the code well documented?
    - Check: aside from this `README`, the files are full of comments where needed
5. Location Details Functionality: does each location provide usable, responsive and interesting content on it?
    - Check: each location fetches an excerpt from italian Wikipedia and renders it in an usable and responsive manner
6. Accessibility: is the website accessible to screen reader users or visually impaired ones?
    - Check: the website's logic is clear and it's fully navigable through a screen reader
7. Offline Use: does the app have offline functionalities?
    - Check: the website gets cached by the service worker provided by `create-react-app`
8. Application Architecture: is React used in a proper manner?
    - Check: the app uses a bare minimum amount of components to handle the logic and uses the React functions (`render`, `componentDidMount`, `componentDidUpdate`, `shouldComponentUpdate`, `setState`) in the suggested way

## Credits
- APIs used:
    - Google Maps API through Tom Chen's `react-google-maps` ([here](https://github.com/tomchentw/react-google-maps))
    - MediaWiki API ([here](https://www.mediawiki.org/wiki/API:Query)) for fetching from Wikipedia
- utilities used:
    - Google Maps APIs Styling Wizard ([here](https://mapstyle.withgoogle.com/)) for the map's styling
    - Darryl Huffman's "Scrollbar Generator" ([here](https://darrylhuffman.com/sites/Scrollbar-gen/)) for the scrollbars' styling
    - ICO converter ([here](https://www.icoconverter.com/)) for the app's favicon
- logo, menu icon and favicon designed by me
