<script>
//You just need to add this whole script to a separate webflow embed code element and then place it anywhere below the page

const miltonData = [
  { name: "Glenorchy", fill: "#e0e0e0", link: "/milton/glenorchy", offsetX: 0, offsetY: 0 },
  { name: "Ford Drive", fill: "#cccccc", link: "/milton/ford-drive", offsetX: 0, offsetY: 0 },
  { name: "Morrison", fill: "#f5f5f5", link: "/milton/morrison", offsetX: 0, offsetY: 0 },
  { name: "Old Oakville", fill: "#d9d9d9", link: "/milton/old-oakville", offsetX: 0, offsetY: 0 },
  { name: "Sw Oakville", fill: "#bfbfbf", link: "/milton/sw-oakville", offsetX: 0, offsetY: 0 },
  { name: "Bronte", fill: "#f0f0f0", link: "/milton/bronte", offsetX: 0, offsetY: 0 },
  { name: "Central Oakville", fill: "#d0d0d0", link: "/milton/central-oakville", offsetX: 0, offsetY: 0 },
  { name: "Queen Elizabeth Industrial Area", fill: "#ededed", link: "/milton/qe-industrial", offsetX: 0, offsetY: 0 },
  { name: "West Oakville", fill: "#c9c9c9", link: "/milton/west-oakville", offsetX: 0, offsetY: 0 },
  { name: "Clear View", fill: "#f2f2f2", link: "/milton/clear-view", offsetX: 0, offsetY: 0 },
  { name: "Falgarwood", fill: "#d6d6d6", link: "/milton/falgarwood", offsetX: 0, offsetY: 0 },
  { name: "College Park", fill: "#e6e6e6", link: "/milton/college-park", offsetX: 0, offsetY: 0 },
  { name: "Glen Abbey", fill: "#bdbdbd", link: "/milton/glen-abbey", offsetX: 0, offsetY: 0 },
  { name: "Bronte Park", fill: "#f7f7f7", link: "/milton/bronte-park", offsetX: 0, offsetY: 0 },
  { name: "Winston Park", fill: "#cdcdcd", link: "/milton/winston-park", offsetX: 0, offsetY: 0 },
  { name: "Joshua Creek", fill: "#dcdcdc", link: "/milton/joshua-creek", offsetX: 0, offsetY: 0 },
  { name: "Wedgewood Creek", fill: "#f4f4f4", link: "/milton/wedgewood-creek", offsetX: 0, offsetY: 0 },
  { name: "Joshua Meadows", fill: "#cfcfcf", link: "/milton/joshua-meadows", offsetX: 0, offsetY: 0 },
  { name: "West Oak trails", fill: "#e8e8e8", link: "/milton/west-oak-trails", offsetX: 0, offsetY: 0 },
  { name: "River Oaks", fill: "#b8b8b8", link: "/milton/river-oaks", offsetX: 0, offsetY: 0 },
  { name: "Bronte Creek", fill: "#f9f9f9", link: "/milton/bronte-creek", offsetX: 0, offsetY: 0 },
  { name: "West Mount", fill: "#d2d2d2", link: "/milton/west-mount", offsetX: 0, offsetY: 0 },
];

const oakvilleData = [
  { name: "Bronte Meadows", fill: "#e0e0e0", link: "/oakville/bronte-meadows", offsetX: 0, offsetY: 0 },
  { name: "Cobden", fill: "#cccccc", link: "/oakville/cobden", offsetX: 0, offsetY: 0 },
  { name: "Ford", fill: "#f5f5f5", link: "/oakville/ford", offsetX: 0, offsetY: 0 },
  { name: "Walker", fill: "#d9d9d9", link: "/oakville/walker", offsetX: 0, offsetY: 0 },
  { name: "Coates", fill: "#bfbfbf", link: "/oakville/coates", offsetX: 0, offsetY: 0 },
  { name: "Wilmott", fill: "#f0f0f0", link: "/oakville/wilmott", offsetX: 0, offsetY: 0 },
  { name: "Beaty", fill: "#d0d0d0", link: "/oakville/beaty", offsetX: 0, offsetY: 0 },
  { name: "Harrison", fill: "#ededed", link: "/oakville/harrison", offsetX: 0, offsetY: 0 },
  { name: "Clarke", fill: "#c9c9c9", link: "/oakville/clarke", offsetX: 0, offsetY: 0 },
  { name: "Timberlea", fill: "#f2f2f2", link: "/oakville/timberlea", offsetX: 0, offsetY: 0 },
  { name: "Bowes", fill: "#d6d6d6", link: "/oakville/bowes", offsetX: 0, offsetY: 0 },
  { name: "Scott", fill: "#e6e6e6", link: "/oakville/scott", offsetX: 0, offsetY: 0 },
  { name: "Old Milton", fill: "#bdbdbd", link: "/oakville/old-milton", offsetX: 0, offsetY: 0 },
  { name: "Milton Heights", fill: "#f7f7f7", link: "/oakville/milton-heights", offsetX: 0, offsetY: 0 },
  { name: "Dempsey", fill: "#cdcdcd", link: "/oakville/dempsey", offsetX: 0, offsetY: 0 },
  { name: "Mountain View", fill: "#dcdcdc", link: "/oakville/mountain-view", offsetX: 0, offsetY: 0 },
  { name: "Dorset Park", fill: "#f4f4f4", link: "/oakville/dorset-park", offsetX: 0, offsetY: 0 },
];



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

function applyFunc(elementId, data) {
  addDropShadow(elementId);
  const paths = document.querySelectorAll(`svg#svg-${elementId} path`);
  paths.forEach((path, i) => {
  	if(!data[i]) return;
    const { name, fill, link, offsetX, offsetY } = data[i];
		//Add anchor and link in each path(pull from data array)
    const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
    anchor.setAttribute("href", link);
    anchor.setAttribute("target", "_blank");
    anchor.style.cursor = "pointer";
    path.parentNode.insertBefore(anchor, path);
    anchor.appendChild(path);

		//add text in each path(pull from data array)
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const bbox = path.getBBox();
    const x = bbox.x + bbox.width / 2 + offsetX;
    const y = bbox.y + bbox.height / 2 + offsetY;
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("class", `path-text-${elementId}`);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.textContent = name;
		anchor.appendChild(text);
    
    // set default fill color(pull from data array)
    path.classList.add(`path-${elementId}`);
    path.setAttribute("fill", fill);
    
    // place scpecific path on top of all other path when hovered
    path.addEventListener("mouseenter", () => {
      anchor.parentNode.appendChild(anchor);
    });
  });
}

applyFunc("milton", miltonData);
applyFunc("oakville", oakvilleData);
</script>
