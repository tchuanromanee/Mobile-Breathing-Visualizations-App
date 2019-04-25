//template = https://bl.ocks.org/mbostock/1642874


var waveColor = "#50b2cf";

// Define audio
var inhaleAudio = new Audio("/audio/high261-63.mp3");
var exhaleAudio = new Audio("/audio/low220.mp3");

var totalTimems = 30000;
var numPhases = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;
console.log(totalNumPhases);

var phase = "Tap to Start";
d3.select("p").html(phase);       // update phase text

//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 960)
	.attr("height", 500)
	.attr("id", "#visContainer")
	.on("mousedown", startAll);

var n = 10;
var inhaleData = d3.range(n);//map(random);
var holdInData = [10,10,10,10,10,10,10,10,10,10];
var exhaleData = d3.range(n).reverse();
var holdOutData = [0,0, 0, 0,0,0,0,0,0,0];

var data = inhaleData.concat(holdInData, exhaleData, holdOutData);
var num = 0;
var maxNum = 10;


var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = +svgContainer.attr("width") - margin.left - margin.right,
    height = +svgContainer.attr("height") - margin.top - margin.bottom,
    g = svgContainer.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([-10, 10])
    .range([height, 0]);

var line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

	
  //Draw the steady line
 var steadyLine = svgContainer.append("line")
	.attr("x1", margin.left)
	.attr("y1", 0)
	.attr("x2", margin.left)
	.attr("y2", height*.6)				
	.style("stroke", "black")
	.style("stroke-width", "2");

g.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

/* // Axes: Uncomment this block for debugging purposes
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));
*/
function startAll() {
	if (phase == "Tap to Start") {
		g.append("g")
			.attr("clip-path", "url(#clip)")
		  .append("path")
			.datum(data)
			.attr("class", "line")
		  .transition()
			.duration(500)
			.ease(d3.easeLinear)
			.on("start", tick);
	}
}

function tick() {
	updatePhase();
	if (phase == "Exercise Completed") {
		return;
	}
  // Redraw the line.
  d3.select(this)
      .attr("d", line)
      .attr("transform", null);

  // Slide it to the left.
  d3.active(this)
      .attr("transform", "translate(" + x(-1) + ",0)")
    .transition()
      .on("start", tick);

  // Pop the old data point off the front.
  var newNum = data.shift();
  // Push a new data point onto the back.
  data.push(newNum);
}

function updatePhase() {
	if (numPhases >= totalNumPhases && data[1]==1)) {
		phase = "Exercise Completed";
		d3.select("p").html(phase);
		return;
	}
	if (data[0] == 0 && data[1] == 1) {
		phase = "Inhale";
		inhaleAudio.play();
		numPhases++;
		d3.select("p").html(phase);
		return;
	}
	else if (data[0] == 10 && data[1] == 9) {
		phase = "Exhale";
		exhaleAudio.play();
		numPhases++;
		d3.select("p").html(phase);
		return;
	}
	else if (data[0] == 10 && data[1] == 10 && phase != "Hold") {
		phase = "Hold";
		numPhases++;
		d3.select("p").html(phase);
		return;
	}
	else if (data[0] == 0 && data[1] == 0 && phase != "Hold") {
		phase = "Hold";
		numPhases++;
		d3.select("p").html(phase);
		return;
	}
	else {
		phase = phase;
		return;
	}
}