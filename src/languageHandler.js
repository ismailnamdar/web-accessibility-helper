const constants = require("../constants");
/**
* set html tag's lang and xml:lang attributes
*/
function setLanguage(languageCode) {
	const htmlNode = document.querySelector("html");
	if(htmlNode && htmlNode.getAttribute("lang") == undefined || htmlNode.getAttribute("lang").length === 0) {
		htmlNode.setAttribute("lang", languageCode);
		htmlNode.setAttribute("xml:lang", languageCode);
	}
}

/**
* construct a string with found texts in document 
* maxLength MAX_DETECT_TEXT_LENGTH
*/
function detectText(element, text) {
	if(text.length > constants.MAX_DETECT_TEXT_LENGTH) { 
		return text;
	}
	let newText = text;
	element.childNodes.forEach((e) => {
		if(e.nodeName === "#text" && typeof e.nodeValue === "string" && e.nodeValue.trim().length > 3 && e.nodeValue.trim().length < 40) {
			newText += " " + e.nodeValue.trim();
    	}
    	newText = detectText(e, newText);
	});
	return newText;
}

async function detectAndFixLanguage() {
	// language detection api supports 5.000 request per month
	// access_key is the free apiKey
	const detectLanguageUrl = "http://api.languagelayer.com/detect?access_key=d64313d70ebd25898fc87a2e4f5c542a&query=";

	const root = document.documentElement || document.body;
	const detectableText = detectText(root, "", 0);
	if(detectableText.length) {
		const response = await fetch(detectLanguageUrl + detectableText).then(response => response.json());
		if(response.results && response.results.length) {
			const bestLanguagePrediction = response.results[0];
			const languageCode = bestLanguagePrediction.language_code;
			setLanguage(languageCode);
		}
	}
}

module.exports = {
	detectAndFixLanguage: detectAndFixLanguage
};