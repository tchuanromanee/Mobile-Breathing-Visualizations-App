//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	.attr("width", 960)
	.attr("height", 500);

var width = 960,
    height = 500,
	innerRadiusArc = 50,
	outerRadiusArc = 70;
// Draw inhale arc	
var inhaleArc = d3.arc()
    .innerRadius(innerRadiusArc)
    .outerRadius(outerRadiusArc)
    .startAngle(0); //converting from degs to radians
  //  .endAngle(Math.PI/2); //just radians

  var arc = d3.arc()
    .innerRadius(innerRadiusArc)
    .outerRadius(outerRadiusArc)
    .startAngle(0);


	  
var inhaleArcElem = svgContainer.append("path")	  
    .datum({endAngle: Math.PI/2})
    .attr("transform", "translate(100,100)")
	.style("fill", "green")
	.attr("d", inhaleArc)
	.on("mousedown", inhale);
//	.transition()
  //    .duration(750)
     // .attrTween("d", arcTween(Math.random() * Math.PI));
	
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
	.style("fill", "yellow");
	

// Draw exhale arc	
var exhaleArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(Math.PI) //converting from degs to radians
    .endAngle(3 * Math.PI/2); //just radians

var exhaleArcElem = svgContainer.append("path")
    .attr("d", exhaleArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "red");

// Draw exhale hold arc	
var exhaleHoldArc = d3.arc()
    .innerRadius(50)
    .outerRadius(70)
    .startAngle(3 * Math.PI/2) //converting from degs to radians
    .endAngle(2 * Math.PI); //just radians

var exhaleHoldArcElem = svgContainer.append("path")
    .attr("d", exhaleHoldArc)
    .attr("transform", "translate(100,100)")
	.style("fill", "yellow");
	
var overlayArcElem = svgContainer.append("path")
    .datum({endAngle: 0})
    .style("fill", "green")
	.style("stroke", "black")
	.attr("transform", "translate(100,100)")
	//.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("d", arc)
	.on("mousedown", inhale);

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
	overlayArcElem.transition()
      .duration(phaseDurationms)
      .attrTween("d", arcTween(Math.PI/2))
		.on("end", hold);
};

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(newAngle) {

  // The function passed to attrTween is invoked for each selected element when
  // the transition starts, and for each element returns the interpolator to use
  // over the course of transition. This function is thus responsible for
  // determining the starting angle of the transition (which is pulled from the
  // element’s bound datum, d.endAngle), and the ending angle (simply the
  // newAngle argument to the enclosing function).
  return function(d) {

    // To interpolate between the two angles, we use the default d3.interpolate.
    // (Internally, this maps to d3.interpolateNumber, since both of the
    // arguments to d3.interpolate are numbers.) The returned function takes a
    // single argument t and returns a number between the starting angle and the
    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
    // newAngle; and for 0 < t < 1 it returns an angle in-between.
    var interpolate = d3.interpolate(d.endAngle, newAngle);

    // The return value of the attrTween is also a function: the function that
    // we want to run for each tick of the transition. Because we used
    // attrTween("d"), the return value of this last function will be set to the
    // "d" attribute at every tick. (It’s also possible to use transition.tween
    // to run arbitrary code for every tick, say if you want to set multiple
    // attributes from a single function.) The argument t ranges from 0, at the
    // start of the transition, to 1, at the end.
    return function(t) {

      // Calculate the current arc angle based on the transition time, t. Since
      // the t for the transition and the t for the interpolate both range from
      // 0 to 1, we can pass t directly to the interpolator.
      //
      // Note that the interpolated angle is written into the element’s bound
      // data object! This is important: it means that if the transition were
      // interrupted, the data bound to the element would still be consistent
      // with its appearance. Whenever we start a new arc transition, the
      // correct starting angle can be inferred from the data.
      d.endAngle = interpolate(t);

      // Lastly, compute the arc path given the updated data! In effect, this
      // transition uses data-space interpolation: the data is interpolated
      // (that is, the end angle) rather than the path string itself.
      // Interpolating the angles in polar coordinates, rather than the raw path
      // string, produces valid intermediate arcs during the transition.
      return arc(d);
    };
  };
}

function hold() {
	var prevPhase = phase;
	numPhases++;
	phase = "Hold";
	d3.select("p").html(phase);
	
	if (prevPhase.localeCompare("Inhale") == 0) {
	//	inhale then hold, then time for exhale
	overlayArcElem.transition()
      .duration(phaseDurationms)
      .attrTween("d", arcTween(Math.PI))
		.on("end", exhale);
	}
	else {
	overlayArcElem.transition()
      .duration(phaseDurationms)
      .attrTween("d", arcTween(2* Math.PI))
		.on("end", inhale);
	}
}

function exhale(){
	numPhases++;
	phase = "Exhale";
	d3.select("p").html(phase);
	
	
	overlayArcElem.transition()
      .duration(phaseDurationms)
      .attrTween("d", arcTween(3 * Math.PI/2))
		.on("end", hold);
		 
};