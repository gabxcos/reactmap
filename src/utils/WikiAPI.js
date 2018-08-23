export function getWiki(id){
	return fetch('https://it.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&redirects=true&pageids='+id)
	.then(data => data.json())
	.then(result => result.query.pages[id].extract)
}