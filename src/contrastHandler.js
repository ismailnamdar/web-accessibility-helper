/**
* finds #text nodes
* sets parentNode color to white and background to black
* increases contrast 
*/
function adjustColorContrast(element = document.documentElement || document.body) {
	element.childNodes.forEach((e) => {
		if(e.nodeName === "#text" && typeof e.nodeValue === "string") {
			e.parentElement.style.color = "black";
			e.parentElement.style.backgroundColor = "white";
    	}
		adjustColorContrast(e);
	});
}

module.exports = {
	adjustColorContrast: adjustColorContrast
};