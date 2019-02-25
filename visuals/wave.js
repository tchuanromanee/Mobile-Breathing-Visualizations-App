//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 200)
	.attr("height", 250);
	
  //Draw the steady line
 var steadyLine = svgContainer.append("line")
	.attr("x1", 100)
	.attr("y1", 0)
	.attr("x2", 100)
	.attr("y2", 200)				
	.style("stroke", "black")
	.style("stroke-width", "5");
	 
	  //Draw the bottom overlay Ellipse
 var curvedPath = svgContainer.append("path")
	.style("stroke", "black")
	.style("stroke-width", "5")
	.on("mousedown", inhale);
  
  
 var lineGenerator = d3.line();
 
 var points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];

var pathData = lineGenerator(points);
// pathData is "M0,80L100,100L200,30L300,50L400,40L500,80"

curvedPath
  .attr('d', pathData);
		 

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