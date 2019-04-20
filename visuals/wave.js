//var width = 960,
   // height = 500,
    //start = Date.now();


var waveColor = "#50b2cf";

var totalTimems = 30000;
var numPhases = 0;
var phase = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;


//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 960)
	.attr("height", 500)
	.attr("id", "#visContainer");
//	.on("mousedown", inhale);

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

g.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

	
g.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
  .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .on("start", tick);

function tick() {


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


/*	
  //Draw the steady line
 var steadyLine = svgContainer.append("line")
	.attr("x1", 100)
	.attr("y1", 0)
	.attr("x2", 100)
	.attr("y2", 200)				
	.style("stroke", "black")
	.style("stroke-width", "5");

anchorx1 = 120;
anchorx2 = 0;
	
 var inhaleLine = svgContainer.append("line")
	.attr("x1", anchorx1)
	.attr("y1", 50)
	.attr("x2", anchorx2)
	.attr("y2", 150)				
	.style("stroke", waveColor)
	.style("stroke-width", "3");

var phase = "Tap to Start";
d3.select("p").html(phase);       // update phase text

function inhale(){
	numPhases++;
	if (numPhases >= totalNumPhases) {
		phase = "Exercise Completed";
		d3.select("p").html(phase);
		return;
	}
	phase = "Inhale";
	anchorx1 = 20;
	anchorx2 = 0;
	d3.select("p").html(phase);
	 inhaleLine.transition()
      .ease(d3.easeLinear)
      .duration(phaseDurationms)
      .attr("x1",anchorx1)
      .attr("x2",anchorx2);
	//.on("end", hold);
};


function hold() {
	numPhases++;
	phase = "Hold";
	d3.select("p").html(phase);

	if (overlayRectangle.attr("height") == 200 && overlayRectangle.attr("y") == 10) {
		//inhale then hold, then time for exhale
		
		overlayRectangle.transition().delay(phaseDurationms).on("end",exhale);
	}
	else {
		overlayRectangle.transition().delay(phaseDurationms).on("end",inhale);
	}
}

function exhale(){
	numPhases++;
	phase = "Exhale";
	d3.select("p").html(phase);
//.on("end", hold);
}
*/