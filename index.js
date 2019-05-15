const languageHandler = require("./src/languageHandler");
const imageHandler = require("./src/imageHandler");
const contrastHandler = require("./src/contrastHandler");
const mutationHandler = require("./src/mutationHandler");
const linkHandler = require("./src/linkHandler");
const textHandler = require("./src/textHandler");
const eventHandler = require("./src/eventHandler");

window.onload = async () => { 
	await imageHandler.detectAndFixImage();
	contrastHandler.adjustColorContrast();
	languageHandler.detectAndFixLanguage();
	mutationHandler.addDocTypeHtml();
	linkHandler.removeEmptyLinks();
	textHandler.changeIToEm();
	textHandler.changeBToStrong();
	textHandler.changeFontToP();
	eventHandler.addOnBlur();
	eventHandler.addOnFocus();
	mutationHandler.observeDOMChange();
};