// Draw background rectangle
//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 200)
	.attr("height", 250);
 
  //Draw the bottom background Ellipse
 var bottomBgEllipse = svgContainer.append("ellipse")
	 .attr("cx", 35)
	 .attr("cy", 211)
	 .attr("rx", 25)
	 .attr("ry", 10)
	 .style("fill", "white")
	 .style("stroke", "black");
						 
 //Draw the background Rectangle
 var bgRectangle = svgContainer.append("rect")
	.attr("x", 10)
	.attr("y", 10)
	.attr("width", 50)
	.attr("height", 200)				
	.style("fill", "white")
	.on("mousedown", inhale);

 //Draw the Rectangle
 var overlayRectangle = svgContainer.append("rect")
	.attr("x", 10)
	.attr("y", 10)
	.attr("width", 50)
	.attr("height", 0)				
	.style("fill", "steelblue")
	.style("opacity", "0"); //default invisible

 //Draw the top background Ellipse
 var topBgEllipse = svgContainer.append("ellipse")
	 .attr("cx", 35)
	 .attr("cy", 11)
	 .attr("rx", 25)
	 .attr("ry", 10)
	 .style("fill", "white")
	 .style("stroke", "black");

 //Draw the bottom overlay Ellipse
var bottomOverlayEllipse = svgContainer.append("ellipse")
	 .attr("cx", 35)
	 .attr("cy", 211)
	 .attr("rx", 25)
	 .attr("ry", 10)
	 .style("fill", "steelblue")
	 .style("opacity", "0"); //default invisible
	 
	  //Draw the bottom overlay Ellipse
var bottomFixedEllipse = svgContainer.append("ellipse")
	 .attr("cx", 35)
	 .attr("cy", 211)
	 .attr("rx", 25)
	 .attr("ry", 10)
	 .style("fill", "steelblue")
	 .style("opacity", "0"); //default invisible
  
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