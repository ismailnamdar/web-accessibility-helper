function replaceTagName(source, target) {
	const sources = document.querySelectorAll(source);
	sources.forEach((source) => {
		const range = document.createRange();
	    const element = document.createElement(target);
	    range.selectNodeContents(source);
	    element.appendChild(range.extractContents());
	    source.parentNode.replaceChild(element, source);
	});
}

/**
* changes <b/> tag to <strong/> tag
*/
function changeBToStrong() {
	replaceTagName("b", "strong");
}

/**
* changes <i/> tag to <em/> tag
*/
function changeIToEm() {
	replaceTagName("i", "em");
}

/**
* changes <font/> tag to <p/> tag
*/
function changeFontToP() {
	replaceTagName("font", "p");
}

module.exports = {
	changeIToEm: changeIToEm,
	changeBToStrong: changeBToStrong,
	changeFontToP: changeFontToP
};