var circleRep = d3.select("#myCircle")
circleRep.attr("r", 10);
circleRep.style("fill", "steelblue"); 
circleRep.attr("cx", 50)
    .attr("cy", 50)//.on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    .on("mousedown", sphereVisualizationIn);

var totalTimems = 30000;
var numPhases = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;

var phase = "Tap to Start";

d3.select("p").html(phase);       // update phase text


function sphereVisualizationIn(){
	numPhases++;
	if (numPhases >= totalNumPhases) {
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