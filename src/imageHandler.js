const Clarifai = require("clarifai");
const constants = require("../constants");

const app = new Clarifai.App({
 apiKey: "4d85eeef68d94410816e9cd40d21e6c6"
});

// send request to specified api with image url
async function predictImage(src) {
	try {
		const response = await app.models.predict(Clarifai.GENERAL_MODEL, src);
		const concepts = response['outputs'][0]['data']['concepts'];
		return concepts;
	}
	catch(error) {
		console.log(error);
		return null;
	}
}

// constructs image attributes: alt, longdesc
function constructImageAttributes(concepts) {
	return concepts.reduce((acc, elem) => {
		if(acc.altWordCount < constants.IMAGE_PREDICT_ALT_MIN_WORD && elem.value > constants.IMAGE_PREDICT_ALT_MIN_RATE) {
			acc.alt += elem.name + " ";
			acc.altWordCount += 1;
		}
		if(acc.longDescWordCount < constants.IMAGE_PREDICT_LONGDESC_MIN_WORD && elem.value > constants.IMAGE_PREDICT_LONGDESC_MIN_RATE) {
			acc.longDesc += elem.name + " ";
			acc.longDescWordCount += 1;
		}
		return acc;
	}, { alt: "", longDesc: "", altWordCount: 0, longDescWordCount: 0});
}

async function detectAndFixImage() {
	const images = document.querySelectorAll("img") || [];
	const results = Object.keys(images).map(async (key) => {
		const image = images[key];
		if(image.getAttribute("alt") == null || image.getAttribute("alt").length === 0) {
			const src = image.currentSrc;
			try {
				const imageConcepts = await predictImage(src);
				if(imageConcepts == null) {
					throw "Can not predict image!";
				}
				const imageAttributes = constructImageAttributes(imageConcepts);
				image.setAttribute("alt", imageAttributes.alt);
				if(image.getAttribute("longdesc") == null || image.getAttribute("longdesc").length === 0) {
					image.setAttribute("longdesc", imageAttributes.longDesc);
				}
			}
			catch(error) {
				console.log(error);
			}
		}
	});
	try {
		for (const result of results) {
    		await result;
  		}
	}
	catch(error) {
		console.log(error);
	}
	
}

module.exports = {
	detectAndFixImage: detectAndFixImage
};