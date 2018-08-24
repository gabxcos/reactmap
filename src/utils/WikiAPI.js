/* This file's purpose is to act as an API to fetch requests from Wikipedia's "MediaWiki API" */
/* NOTES: as many of the locations do not exist on English Wikipedia, for the sole scope of showing
 * some content in the app to be validated, results are gathered from italian Wikipedia instead */
export function getWiki(id){
	return fetch('https://it.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&redirects=true&pageids='+id)
	.then(data => data.json())
	.then(result => result.query.pages[id].extract)
}