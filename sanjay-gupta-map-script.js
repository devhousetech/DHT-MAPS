<script>
	const miltonData = [
		{ name: "Glenorchy", fill: "#e0e0e0", link: "/milton/glenorchy" },
		{ name: "Ford Drive", fill: "#cccccc", link: "/milton/ford-drive" },
		{ name: "Morrison", fill: "#f5f5f5", link: "/milton/morrison" },
		{ name: "Old Oakville", fill: "#d9d9d9", link: "/milton/old-oakville" },
		{ name: "Sw Oakville", fill: "#bfbfbf", link: "/milton/sw-oakville" },
		{ name: "Bronte", fill: "#f0f0f0", link: "/milton/bronte" },
		{ name: "Central Oakville", fill: "#d0d0d0", link: "/milton/central-oakville" },
		{ name: "Queen Elizabeth Industrial Area", fill: "#ededed", link: "/milton/qe-industrial" },
		{ name: "West Oakville", fill: "#c9c9c9", link: "/milton/west-oakville" },
		{ name: "Clear View", fill: "#f2f2f2", link: "/milton/clear-view" },
		{ name: "Falgarwood", fill: "#d6d6d6", link: "/milton/falgarwood" },
		{ name: "College Park", fill: "#e6e6e6", link: "/milton/college-park" },
		{ name: "Glen Abbey", fill: "#bdbdbd", link: "/milton/glen-abbey" },
		{ name: "Bronte Park", fill: "#f7f7f7", link: "/milton/bronte-park" },
		{ name: "Winston Park", fill: "#cdcdcd", link: "/milton/winston-park" },
		{ name: "Joshua Creek", fill: "#dcdcdc", link: "/milton/joshua-creek" },
		{ name: "Wedgewood Creek", fill: "#f4f4f4", link: "/milton/wedgewood-creek" },
		{ name: "Joshua Meadows", fill: "#cfcfcf", link: "/milton/joshua-meadows" },
		{ name: "West Oak trails", fill: "#e8e8e8", link: "/milton/west-oak-trails" },
		{ name: "River Oaks", fill: "#b8b8b8", link: "/milton/river-oaks" },
		{ name: "Bronte Creek", fill: "#f9f9f9", link: "/milton/bronte-creek" },
		{ name: "West Mount", fill: "#d2d2d2", link: "/milton/west-mount" },
	];

	const oakvilleData = [
		{ name: "Bronte Meadows", fill: "#e0e0e0", link: "/oakville/bronte-meadows" },
		{ name: "Cobden", fill: "#cccccc", link: "/oakville/cobden" },
		{ name: "Ford", fill: "#f5f5f5", link: "/oakville/ford" },
		{ name: "Walker", fill: "#d9d9d9", link: "/oakville/walker" },
		{ name: "Coates", fill: "#bfbfbf", link: "/oakville/coates" },
		{ name: "Wilmott", fill: "#f0f0f0", link: "/oakville/wilmott" },
		{ name: "Beaty", fill: "#d0d0d0", link: "/oakville/beaty" },
		{ name: "Harrison", fill: "#ededed", link: "/oakville/harrison" },
		{ name: "Clarke", fill: "#c9c9c9", link: "/oakville/clarke" },
		{ name: "Timberlea", fill: "#f2f2f2", link: "/oakville/timberlea" },
		{ name: "Bowes", fill: "#d6d6d6", link: "/oakville/bowes" },
		{ name: "Scott", fill: "#e6e6e6", link: "/oakville/scott" },
		{ name: "Old Milton", fill: "#bdbdbd", link: "/oakville/old-milton" },
		{ name: "Milton Heights", fill: "#f7f7f7", link: "/oakville/milton-heights" },
		{ name: "Dempsey", fill: "#cdcdcd", link: "/oakville/dempsey" },
		{ name: "Mountain View", fill: "#dcdcdc", link: "/oakville/mountain-view" },
		{ name: "Dorset Park", fill: "#f4f4f4", link: "/oakville/dorset-park" },
	];

	const pathsMilton = document.querySelectorAll('g#milton path');
	const pathsOakville = document.querySelectorAll('g#oakville path');

	function applyData(className, paths, data, offsetX = 0, offsetY = 0) {
		paths.forEach((path, i) => {
			const { name, fill, link } = data[i];
			const bbox = path.getBBox();
			const x = bbox.x + bbox.width / 2 + offsetX;
			const y = bbox.y + bbox.height / 2 + offsetY;

			// create anchor wrapper
			const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
			anchor.setAttribute("href", link);
			anchor.setAttribute("target", "_self");
			path.parentNode.insertBefore(anchor, path);
			anchor.appendChild(path);

			// apply class to path (so css take effect)
			path.classList.add(className);

			// add label
			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.setAttribute("x", x);
			text.setAttribute("y", y);
			text.setAttribute("class", "region-label");
			text.setAttribute("text-anchor", "middle");
			text.setAttribute("dominant-baseline", "middle");
			text.textContent = name;
			anchor.appendChild(text);

			// add idle color for each path
			path.setAttribute("fill", fill);

			// hover make sure element is on top
			path.addEventListener("mouseenter", () => {
				anchor.parentNode.appendChild(anchor);
			});
		});
	}

	applyData("region-milton", pathsMilton, miltonData, 0, 0);
	applyData("region-oakville", pathsOakville, oakvilleData, 0, 0);

</script>
