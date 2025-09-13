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

//this function's puspose is to create defs element that will be use for dropshadow(in path's hover state)
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
  dropShadow.setAttribute("dx", "4");   
  dropShadow.setAttribute("dy", "4");          
  dropShadow.setAttribute("stdDeviation", "6"); 
  dropShadow.setAttribute("flood-color", "#000");
  dropShadow.setAttribute("flood-opacity", "0.6"); 
  
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
    if (!data[i]) return;
    const { name, fill, link, offsetX = 0, offsetY = 0, wordsPerLine = 2, fontSize = "18px", disable = false } = data[i];
    path.setAttribute("fill", fill);

    // Add anchor wrapper if not exists
    let anchor;
    if (path.parentNode.tagName.toLowerCase() !== "a") {
      anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
      anchor.setAttribute("href", disable ? "#" : link);
  		anchor.setAttribute("target", "_self");
  		anchor.setAttribute("pointer-events", disable ? "none" : "auto");
  		anchor.style.cursor = disable ? "default" : "pointer";
      path.parentNode.insertBefore(anchor, path);
      anchor.appendChild(path);
    } else {
      anchor = path.parentNode;
    }

    // Group wrapper for text + rect
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("pointer-events", "none");
    anchor.appendChild(group);

    // create text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const bbox = path.getBBox();
    const x = bbox.x + bbox.width / 2 + offsetX;
    const y = bbox.y + bbox.height / 2 + offsetY;
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", disable ? "0px" : fontSize);

    splitName(name, wordsPerLine).forEach((line, index) => {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", x);
      tspan.setAttribute("dy", index === 0 ? "0" : "1.2em");
      tspan.textContent = line;
      text.appendChild(tspan);
    });

    // create rect element for bg (initially transparent in CSS)
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("rx", "4");
    rect.setAttribute("ry", "4");
    group.appendChild(rect);
    group.appendChild(text);

    // On hover, rect calculate required padding for text
    path.addEventListener("mouseenter", () => {
      anchor.parentNode.appendChild(anchor);
      text.setAttribute("font-size", "20px");
      const textBBox = text.getBBox();
      rect.setAttribute("x", textBBox.x - 15);
      rect.setAttribute("y", textBBox.y - 8);
      rect.setAttribute("width", textBBox.width + 30);
      rect.setAttribute("height", textBBox.height + 16);
    });
    path.addEventListener("mouseleave", () => {
  		text.setAttribute("font-size", fontSize); 
		});
  });
}

applyFunc("yourmapname", yourmapname);
</script>



