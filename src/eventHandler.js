/**
* if onmouseout is set also onblur must be set 
*/
function addOnBlur(element = document.documentElement || document.body) {
	element.childNodes.forEach((e) => {
		const onMouseOut = e.getAttribute && e.getAttribute("onmouseout");
		if( onMouseOut !== null && e.getAttribute && e.getAttribute("onblur") == null) {
			e.setAttribute("onblur", onMouseOut);
    	}
		addOnBlur(e);
	});
}

/**
* if onmouseover is set also onfocus must be set 
*/
function addOnFocus(element = document.documentElement || document.body) {
	element.childNodes.forEach((e) => {
		const onMouseOver = e.getAttribute && e.getAttribute("onmouseover");
		if( onMouseOver !== null && e.getAttribute && e.getAttribute("onfocus") == null) {
			e.setAttribute("onfocus", onMouseOver);
    	}
		addOnFocus(e);
	});
}

module.exports = {
	addOnBlur: addOnBlur,
	addOnFocus: addOnFocus
};