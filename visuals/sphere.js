var circleDemo = d3.select("#myCircle")
circleDemo.attr("r", 40);
circleDemo.style("stroke", "black");
circleDemo.style("fill", "steelblue"); 
circleDemo.attr("cx", 50)
    .attr("cy", 50).on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mousedown", animateFirstStep);

function animateFirstStep(){
    d3.select(this)
      .transition()            
        .delay(0)            
        .duration(1000)
        .attr("r", 10)
        .each("end", animateSecondStep);
};

function animateSecondStep(){
    d3.select(this)
		.transition()
        .duration(1000)
        .attr("r", 40);
};