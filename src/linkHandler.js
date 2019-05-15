/**
* empty links = no child node and no title attr
* find and remove from DOM
*/
function removeEmptyLinks() {
	const links = document.querySelectorAll("a");
	links.forEach((link) => {
		if(link.childNodes.length === 0 && link.getAttribute("title") === null) {
			link.remove();
		}
	});
}

module.exports = {
	removeEmptyLinks: removeEmptyLinks
};