<script>
// array for your svg
const yourmapname = [
  { name: "Bronte Meadows", fill: "#e0e0e0", link: "/yourmapname/bronte-meadows" },
  { name: "Cobden", fill: "#cccccc", link: "/yourmapname/cobden" },
  { name: "Ford", fill: "#dfdfdf", link: "/yourmapname/ford" },
  { name: "Walker", fill: "#d9d9d9", link: "/yourmapname/walker"},
  { name: "Coates", fill: "#bfbfbf", link: "/yourmapname/coates" },
  { name: "Wilmott", fill: "#f0f0f0", link: "/yourmapname/wilmott" },
  { name: "Beaty", fill: "#e2e3e1", link: "/yourmapname/beaty" },
  { name: "Harrison", fill: "#f7f7f7", link: "/yourmapname/harrison" },
  { name: "Clarke", fill: "#c9c9c9", link: "/yourmapname/clarke" },
  { name: "Timberlea", fill: "#d7d7d7", link: "/yourmapname/timberlea" },
  { name: "Bowes", fill: "#d6d6d6", link: "/yourmapname/bowes" },
  { name: "Scott", fill: "#e6e6e6", link: "/yourmapname/scott" },
  { name: "Old Milton", fill: "#bdbdbd", link: "/yourmapname/old-milton", offsetX: -40, offsetY: 10},
  { name: "Milton Heights", fill: "#cfcfcf", link: "/yourmapname/milton-heights" },
  { name: "Dempsey", fill: "#cdcdcd", link: "/yourmapname/dempsey" },
  { name: "Mountain View", fill: "#dcdcdc", link: "/yourmapname/mountain-view", wordsPerLine: 1 },
  { name: "Dorset Park", fill: "#f4f4f4", link: "/yourmapname/dorset-park" },
];

//this function's puspose is to create defs element that will be use for dropshadow(in hover state)
function addDropShadow(elementId) {
	const svg = document.querySelector(`svg#svg-${elementId}`);
	
	const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	svg.insertBefore(defs, svg.firstChild);
	
	const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
	filter.setAttribute("id", `path-shadow-${elementId}`);
	filter.setAttribute("x", "-50%");
	filter.setAttribute("y", "-50%");
	filter.setAttribute("width", "200%");
	filter.setAttribute("height", "200%");
	
	const dropShadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
	dropShadow.setAttribute("dx", "2");
	dropShadow.setAttribute("dy", "2");
	dropShadow.setAttribute("stdDeviation", "3");
	dropShadow.setAttribute("flood-color", "#000");
	dropShadow.setAttribute("flood-opacity", "0.4");
	
	filter.appendChild(dropShadow);
	defs.appendChild(filter);
}

// this function's puspose is to splitword according to wordPerline value you will set
function splitName(name, maxWordsPerLine = 2) {
	const words = name.split(' ');
	const lines = [];
	for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
	}
	return lines;
}


// this function will execute all logic
function applyFunc(elementId, data) {
	addDropShadow(elementId);
	const paths = document.querySelectorAll(`svg#svg-${elementId} path`);
	paths.forEach((path, i) => {
		if(!data[i]) return;

		// extracting object from array
		const { name, fill, link, offsetX = 0, offsetY = 0, wordsPerLine = 2 } = data[i];
		path.classList.add(`path-${elementId}`);
		
		// this will set default fill color for each path(fill color pull from array)
		path.setAttribute("fill", fill);
		
		//creating anchor element and add links in each(links pull from array)
		let anchor;
		if (path.parentNode.tagName.toLowerCase() !== 'a') {
			anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
			anchor.setAttribute("href", link);
			anchor.setAttribute("target", "_self");
			anchor.style.cursor = "pointer";
			path.parentNode.insertBefore(anchor, path);
			anchor.appendChild(path);
		} else {
			// this will avoid duplication of the creation of anchor
			anchor = path.parentNode;
		}
		
		//this will add text inside each path(data pull from array)
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		const bbox = path.getBBox();
		const x = bbox.x + bbox.width / 2 + offsetX;
		const y = bbox.y + bbox.height / 2 + offsetY;
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.setAttribute("class", `path-text-${elementId}`);
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("pointer-events", "none");
		splitName(name, wordsPerLine).forEach((line, index) => {
			const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
			tspan.setAttribute("x", x);
			tspan.setAttribute("dy", index === 0 ? "0" : "1.2em");
			tspan.textContent = line;
			text.appendChild(tspan);
		});
		anchor.appendChild(text);
		
		// this will place selected path on top of others(in hover state)
		path.addEventListener("mouseenter", () => {
			anchor.parentNode.appendChild(anchor);
		});
	});
}

applyFunc("yourmapname", yourmapname);
</script>
