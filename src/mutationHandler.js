const constants = require("../constants");

// configure default voice parameters
function speak(msg) {
	const message = new SpeechSynthesisUtterance(msg);
	window.speechSynthesis.speak(message);
}

function onChange(mutations) {
	if(mutations.length > constants.MUTATIONS_MAX_SIZE) {
		console.log("Reached maximum length of mutations.");
		console.log("Mutations will be ignored");
		// inform user about mutations
		console.log(mutations.length + " elements changed in the website");
		const msg = `Reached maximum length of mutations.
					${mutations.length} elements changed in the website.`;
		speak(msg);
		return;
	}
	mutations.forEach(function(mutation) {
		let type = mutation.type;
		if(type === "childList") {
			if(mutation.addedNodes.length > constants.MUTATIONS_MAX_SIZE) {
				const msg = `Reached maximum length of mutations.
							${mutations.length} elements added.`;
				speak(msg);
				console.log(msg);
			}
			else {
				mutation.addedNodes.forEach(addedNode => {
					const nodeName = addedNode.nodeName;
					const textContent = addedNode.textContent;
					const msg = nodeName + " " + textContent + " added";
					speak(msg);
					console.log(msg);
				});
			}

			if(mutation.removedNodes.length > constants.MUTATIONS_MAX_SIZE) {
				const msg = `Reached maximum length of mutations.
							${mutations.length} elements removed.`;
				speak(msg);
				console.log(msg);
			}
			else {
				mutation.removedNodes.forEach(removedNode => {
					const nodeName = removedNode.nodeName;
					const textContent = removedNode.textContent;
					const msg = nodeName + " " + textContent + " removed";
					speak(msg);
					console.log(msg);
				});
			}
		}
		else if(type === "characterData") {
			const msg = "Old value " + mutation.oldValue + " changed to " + mutation.target.nodeValue;
			speak(msg);
			console.log(msg);
		}
		else if (type === "attributes") {
			// example: "IFRAME"
			const nodeName = mutation.target.nodeName;
			// example: "style"
			const attributeName = mutation.attributeName;
			// example: "border: none;"
			const oldValue = mutation.oldValue;
			const msg = nodeName + " " + attributeName + " attribute change to " + mutation.target.getAttribute(attributeName);
			speak(msg);
			console.log(msg);
		}
		else {
			console.log("Error", type);
		}
	});
}

function observeDOMChange() {
	const domObserver = new MutationObserver(onChange);
	const container = document.documentElement || document.body;
	const config = { 
		attributes: true,
		childList: true, 
		characterData: true, 
		subtree: true, 
		attributeOldValue: true, 
		characterDataOldValue: true 
	};
	domObserver.observe(container, config);
}

/**
* if not exists add document type
*/
function addDocTypeHtml() {
	const docTypeHtml = document.implementation.createDocumentType('html', '-//W3C//DTD XHTML 1.0 Transitional//EN','http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtdd');
	if(document.doctype == null) {
	    document.insertBefore(docTypeHtml, document.childNodes[0]);
	}
}

module.exports = {
	observeDOMChange: observeDOMChange,
	addDocTypeHtml: addDocTypeHtml,
};
