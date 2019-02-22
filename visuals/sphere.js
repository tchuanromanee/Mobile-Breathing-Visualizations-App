var circleRep = d3.select("#myCircle")
circleRep.attr("r", 10);
circleRep.style("fill", "steelblue"); 
circleRep.attr("cx", 50)
    .attr("cy", 50).on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mousedown", sphereVisualizationIn);

var totalTimems = 30000;

var phase = "Not Started";

d3.select("p").html("Phase: "+ phase);       // update some text


function sphereVisualizationIn(){
	phase = "Inhale";
	d3.select("p").html("Phase: " + phase);
    d3.select(this)
		.style("fill", "green");
	d3.select(this)
      .transition()
        .delay(0)            
        .duration(4000)
        .attr("r", 40)
		.on("end", sphereVisualizationHold);
};

function sphereVisualizationHold() {
	phase = "Hold";
	d3.select("p").html("Phase: " + phase);
	d3.select(this).style("fill", "yellow");
	console.log(d3.select(this).attr("r"));
	if (d3.select(this).attr("r") == 40) {
		d3.select(this).transition().delay(4000).on("end",sphereVisualizationOut);
	}
	else {
		d3.select(this).transition().delay(4000).on("end",sphereVisualizationIn);
	}
}

function sphereVisualizationOut(){
	phase = "Exhale";
	d3.select("p").html("Phase: " + phase);
     d3.select(this)
		.style("fill", "red");
	d3.select(this)
		.transition()
        .duration(4000)
        .attr("r", 10)
		.on("end", sphereVisualizationHold);
};

function sphereVisualizationOutHold() {
	phase = "Hold";
	d3.select("p").html("Phase: " + phase);
	d3.select(this).style("fill", "yellow");
	var holdTimer = d3.timer(function(t) { // callback function
		  if (t > 4000) {
			  
			  timer.stop();  // run for 4 seconds
			  sphereVisualizationIn(); // breathe out
		  }
		});
}