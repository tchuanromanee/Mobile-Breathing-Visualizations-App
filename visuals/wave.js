var width = 960,
    height = 500,
    start = Date.now();


var waveColor = "#50b2cf";

var totalTimems = 30000;
var numPhases = 0;
var phase = 0;
var phaseDurationms = 4000; // 4 sec per phase
var totalNumPhases = totalTimems / phaseDurationms;


//Make an SVG Container
 var svgContainer = d3.select("#example").append("svg")
	//.attr("width", 200)
	.attr("height", 250)
	.attr("id", "#visContainer");
	
  //Draw the steady line
 var steadyLine = svgContainer.append("line")
	.attr("x1", 100)
	.attr("y1", 0)
	.attr("x2", 100)
	.attr("y2", 200)				
	.style("stroke", "black")
	.style("stroke-width", "5");
	 var lines = [ ];

var n = 1;
var m = 70;
console.log(d3.range(n));
for (i in d3.range(n))
{
    var speed = .001 * 1 * 4;

    var data = d3.range(m) 
    lines.push({ 
        //radius: 65*i, 
        width: 5, 
        height: 15,
        speed: speed,
        //speed: speed_scale(i),
        index: i,
        data: data
    })

}

var xscale = d3.scaleLinear()
    .domain([0,m])
    .range([0, width])

var omega = -.22
function line_maker( data, speed )
{
   // var freq = Math.PI*.4 + 3 * omega * data.index // * 3000
   var freq = 3000;
    var svgline = d3.line()
    .x(function(d,i)
    {
        return xscale(d);
    })
    .y(function(d,i)
    {
		
		numPhases++;

        var theta = freq * d/m * Math.PI * 4 ;
			//console.log("sin", Math.sin(theta), d)
			
		if (numPhases % 100 != 0 && phase == 0) { // inhale
			var y = data.height * (Math.sin(theta + (n-data.index) * .1 * speed * .18 ));
		
		}
		else if (numPhases % 100 == 0 && (phase == 0 || phase == 2)) {
				phase = 1; // hold
			//	debugger;
				var y = data.height * (n-data.index) * .1 * speed * .18;
		}
		else if (numPhases == 100 && phase == 1) { // exhale
				phase = 2; // exhale
				var y = data.height--;
				y = y * (n-data.index) * .1 * speed * .18;
				
		}
		else {
			var y = 1;
			phase = 0;
			//console.log("hold after ex");
		}
		//LEFT OFF:
		/* if (data.height < 100 && numPhases % 4 == 0) {
			y = data.height + 1;
		}
		else if ( data.height == 100 && numPhases % 4 == 0) {
			numPhases++; // phase is hold
			y = data.height;
		}
		else if (data.height == 0) {
			numPhases++;
			y = data.height;
		}
		else {
			y = data.height - 1;
		}
		console.log(data.height); */
        //console.log ("y", y)
        return y;
    });
    svgline.curve(d3.curveBasis);
    return svgline(data.data);
}



//var spacing = 26;
function lineEnter(d, i) {

    //console.log("line enter", d)
  d3.select(this).selectAll("path.path")
      .data([d])
      .enter()
    .append("svg:path")
      .attr("class", "path")
      //attr("transform", function(_, i) { return "translate(" + [0, h - spacing * d.index] + ")"; })
    .attr("transform", "translate(0,100)")
    .attr("d", function(d,i) {
              return line_maker( d, 0 ) 
            }
        )
      .attr("stroke-width", function(e,i) { return e.width;})
      .attr("stroke", waveColor)
      .attr("fill", "none")

}

var line = svgContainer.selectAll("g.line")
    .data(lines)
  .enter().append("svg:g")
    .attr("class", "line")
    .each(lineEnter);


var sm = .39 

var color = d3.scaleLinear()
    .domain([-1, 1])
    .interpolate(d3.interpolateRgb)
    .range(['#fff', '#000'])

var opacity = d3.scaleLinear()
    .domain([0, n])
    .range([1, .4])


b = 1;
d3.timer(function() {
 // if(pause) return false;
  var elapsed = Date.now() - start
  var damp = .3

  rotate = function(d,i) { 
  var speed = sm * d.speed * elapsed * .1;
    return "rotate(" + speed + ")"; 
  };

  line = d3.select("g.line path")
      .attr("d", function(d,i) {
             //var speed = a * d.speed * elapsed + .01 * d.index
             var speed = sm * .08 * elapsed + d.index * 4;
             return line_maker( d, speed );
        })
      .attr("stroke-opacity", function(d,i) { return opacity(d.index);})
        

});
/* 	  //Draw the wave path
 var curvedPath = svgContainer.append("path")
	.style("stroke", "black")
	.style("stroke-width", "4")
	.on("mousedown", inhale);
  
  
 var lineGenerator = d3.line().curve(d3.curveCardinal);
 
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
	//.on("end", hold);
};


function hold() {
	numPhases++;
	phase = "Hold";
	d3.select("p").html(phase);

	if (overlayRectangle.attr("height") == 200 && overlayRectangle.attr("y") == 10) {
		//inhale then hold, then time for exhale
		
		overlayRectangle.transition().delay(phaseDurationms).on("end",exhale);
	}
	else {
		overlayRectangle.transition().delay(phaseDurationms).on("end",inhale);
	}
}

function exhale(){
	numPhases++;
	phase = "Exhale";
	d3.select("p").html(phase);
//.on("end", hold);
		  */
//};