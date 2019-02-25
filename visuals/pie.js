//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	//.attr("width", 200)
	.attr("height", 400);

// Draw inhale arc	
var inhaleArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(0) //converting from degs to radians
    .endAngle(Math.PI/2); //just radians

svgContainer.append("path")
    .attr("d", inhaleArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "green");
	
// Draw inhale hold arc	
var inhaleHoldArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(Math.PI/2) //converting from degs to radians
    .endAngle(Math.PI); //just radians

svgContainer.append("path")
    .attr("d", inhaleHoldArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "yellow");
	

// Draw exhale arc	
var exhaleArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(Math.PI) //converting from degs to radians
    .endAngle(3 * Math.PI/2); //just radians

svgContainer.append("path")
    .attr("d", exhaleArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "red");

// Draw exhale hold arc	
var exhaleHoldArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(3 * Math.PI/2) //converting from degs to radians
    .endAngle(2 * Math.PI); //just radians

svgContainer.append("path")
    .attr("d", exhaleHoldArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "yellow");

var totalTimems = 30000;
var numPhases = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;

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
	d3.select("p").html(phase);
	
	bottomFixedEllipse.style("opacity", "1");
	//Transition for bottom ellipse
	bottomOverlayEllipse.style("opacity", "1")
		.transition()
			.delay(0)
			.duration(phaseDurationms)
			.attr("cy", 11);
	
	//transition for rectangle
	overlayRectangle.style("opacity", "1")
		.attr("y", 210)
		.transition()
		.delay(0)
         .duration(phaseDurationms)
		 .attr("height", 200)
		 .attr("y", 10)
		 .on("end", hold);
};


function hold() {
	numPhases++;
	phase = "Hold";
	d3.select("p").html(phase);
	//console.log(d3.select(this).attr("r"));
	//Make all components yellow
	//bottomFixedEllipse.style("fill", "yellow");
//	bottomOverlayEllipse.style("fill", "yellow");
	//transition for rectangle
//	overlayRectangle.style("fill", "yellow");
	if (overlayRectangle.attr("height") == 200 && overlayRectangle.attr("y") == 10) {
		//inhale then hold, then time for exhale
		
		overlayRectangle.transition().delay(phaseDurationms).on("end",exhale);
	}
	else {
		overlayRectangle.transition().delay(phaseDurationms).on("end",inhale);
	}
}

 //---------------old stuff below------------------- 
function exhale(){
	numPhases++;
	phase = "Exhale";
	d3.select("p").html(phase);
	
	//Transition for bottom ellipse
	bottomOverlayEllipse
		.transition()
			.delay(0)
			.duration(phaseDurationms)
			.attr("cy", 211);
	
	//transition for rectangle
	overlayRectangle
		.attr("y", 10)
		.transition()
		.delay(0)
        .duration(phaseDurationms)
		.attr("height", 0)
		.attr("y", 210)
		.on("end", hold);
		 
};