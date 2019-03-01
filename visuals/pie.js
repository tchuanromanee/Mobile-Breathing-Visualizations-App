//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 960)
	.attr("height", 500);

var width = 960,
    height = 500,
	innerRadiusArc = 50,
	outerRadiusArc = 70;

// Define colors
var inhaleColor = "#9bb64b";	
var holdColor = "#fff156";
var exhaleColor = "#e64631";
	
// Draw inhale arc	
var inhaleArc = d3.arc()
    .innerRadius(innerRadiusArc)
    .outerRadius(outerRadiusArc)
    .startAngle(0); 

var arc = d3.arc()
	.innerRadius(innerRadiusArc)
	.outerRadius(outerRadiusArc)
	.startAngle(0);
  
var inhaleArcElem = svgContainer.append("path")	  
    .datum({endAngle: Math.PI/2})
    .attr("transform", "translate(100,100)")
	.style("fill", inhaleColor)
	.attr("d", inhaleArc)
	.on("mousedown", inhale);
	
// Draw inhale hold arc	
var inhaleHoldArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(Math.PI/2) //converting from degs to radians
    .endAngle(Math.PI); //just radians

//TODO: Group all arcs
var inhaleHoldArcElem = svgContainer.append("path")
    .attr("d", inhaleHoldArc)
    .attr("transform", "translate(100,100)")
	.style("fill", holdColor);

// Draw exhale arc	
var exhaleArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(Math.PI) //converting from degs to radians
    .endAngle(3 * Math.PI/2); //just radians

var exhaleArcElem = svgContainer.append("path")
    .attr("d", exhaleArc)
    .attr("transform", "translate(100,100)")
	.style("fill", exhaleColor);

// Draw exhale hold arc	
var exhaleHoldArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(3 * Math.PI/2) //converting from degs to radians
    .endAngle(2 * Math.PI); //just radians

var exhaleHoldArcElem = svgContainer.append("path")
    .attr("d", exhaleHoldArc)
    .attr("transform", "translate(100,100)")
	.style("fill", holdColor);
	
var overlayArcElem = svgContainer.append("path")
    .datum({endAngle: 0})
    .style("fill", "#EEEEEE")
	.style("stroke", "#EEEEEE")
	.style("opacity", 0.75)
	.attr("transform", "translate(100,100)")
	//.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("d", arc);

	var phaseParagraph = d3.select("#example").append("p");
var totalTimems = 30000;
var numPhases = 1;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = Math.round(totalTimems / phaseDurationms);
console.log(totalNumPhases);

var phase = "Tap to Start";
phaseParagraph.html(phase);       // update phase text

function inhale(){
	
	if (numPhases > totalNumPhases) {
		phase = "Exercise Completed";
		phaseParagraph.html(phase);
		return;
	}
	console.log(numPhases);
	if (numPhases % 4 == 1) {
		if (numPhases > 1) {
			overlayArcElem.remove();
			overlayArcElem = svgContainer.append("path")
			.datum({endAngle: 0})
			.style("fill", "#EEEEEE")
			.style("stroke", "#EEEEEE")
			.style("opacity", 0.75)
			.attr("transform", "translate(100,100)")
			//.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			.attr("d", arc);
		}
		phase = "Inhale";
		phaseMultiplier = numPhases % 4;
	}
	else if (numPhases % 4 == 2) {
		phase = "Hold";
		phaseMultiplier = numPhases % 4;
	}
	else if (numPhases % 4 == 3) {
		phase = "Exhale";
		phaseMultiplier = numPhases % 4;
	}
	else if (numPhases % 4 == 0) {
		phase = "Hold";
		phaseMultiplier = 4;
	}
	else {
		phase = "BLAH";
	}
	phaseParagraph.html(phase);
	numPhases++;
	overlayArcElem.transition()
		.ease(d3.easeLinear)
		.duration(phaseDurationms)
		.attrTween("d", arcTween(phaseMultiplier * Math.PI/2))
		.on("end", inhale);
	 
};

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(newAngle) {

  return function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  };
}
