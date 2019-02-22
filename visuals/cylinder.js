// Draw background rectangle
//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
                                     .attr("width", 200)
                                     .attr("height", 200);
 
 //Draw the Rectangle
 var rectangle = svgContainer.append("rect")
                             .attr("x", 10)
                             .attr("y", 10)
                            .attr("width", 50)
                            .attr("height", 100)				
							.style("fill", "steelblue")
							.on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
							.on("mousedown", inhale);

  
  
var totalTimems = 30000;
var numPhases = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;

var phase = "Tap to Start";
d3.select("p").html(phase);       // update phase text
  
 //---------------old stuff below------------------- 



function inhale(){
	numPhases++;
	if (numPhases >= totalNumPhases) {
		phase = "Exercise Completed";
		d3.select("p").html(phase);
		return;
	}
	phase = "Inhale";
	d3.select("p").html(phase);
    d3.select(this)
		.style("fill", "green");
	d3.select(this)
      .transition()
        .delay(0)            
        .duration(phaseDurationms)
        .attr("r", 40)
		.on("end", sphereVisualizationHold);
};

function sphereVisualizationHold() {
	numPhases++;
	phase = "Hold";
	d3.select("p").html(phase);
	d3.select(this).style("fill", "yellow");
	console.log(d3.select(this).attr("r"));
	if (d3.select(this).attr("r") == 40) {
		d3.select(this).transition().delay(phaseDurationms).on("end",sphereVisualizationOut);
	}
	else {
		d3.select(this).transition().delay(phaseDurationms).on("end",sphereVisualizationIn);
	}
}

function sphereVisualizationOut(){
	numPhases++;
	phase = "Exhale";
	d3.select("p").html(phase);
     d3.select(this)
		.style("fill", "red");
	d3.select(this)
		.transition()
        .duration(phaseDurationms)
        .attr("r", 10)
		.on("end", sphereVisualizationHold);
};