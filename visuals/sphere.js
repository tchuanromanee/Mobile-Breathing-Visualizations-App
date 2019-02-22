var circleDemo = d3.select("#myCircle")
circleDemo.attr("r", 10);
circleDemo.style("stroke", "black");
circleDemo.style("fill", "steelblue"); 
circleDemo.attr("cx", 50)
    .attr("cy", 50).on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mousedown", sphereVisualizationStart);

var timer = d3.timer(function(t) { // callback function
  if (t > 30000) timer.stop();  // run for 5 seconds
  d3.select("p").html(t);       // update some text
});

function sphereVisualizationStart(){
    d3.select(this)
      .transition()
        .delay(0)            
        .duration(6000)
        .attr("r", 40)
		.style("fill", "green")
        //second transition
		.transition()
		.delay(30)
        .duration(6000)
        .attr("r", 10)
		.style("fill", "red")
		.on("end", sphereVisualizationStart);
};

function circleTransition() { 

    repeat();
    
    function repeat() {
      timeCircle
        .attr('cx', 40)      // position the circle at 40 on the x axis
        .attr('cy', 250)     // position the circle at 250 on the y axis
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('cx', 920)     // move the circle to 920 on the x axis
        .transition()        // apply a transition
        .duration(2000)      // apply it over 2000 milliseconds
        .attr('cx', 40)      // return the circle to 40 on the x axis
        .on("end", repeat);  // when the transition finishes start again
    };

};