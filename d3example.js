/*global d3, sharedObject */
(function () {
    "use strict";

    // Various accessors that specify the four dimensions of data to visualize.
<<<<<<< HEAD
    function x(d) { return d.lat; }
    function y(d) { return d.lon; }
    function radius(d) { return d.radio[0][1]; }
    function color(d) { return d.name; }
    function key(d) { return d.name; }


=======
    function x(d) { return d.radio; }
    function y(d) { return d.radio; }
    function radius(d) { return d.radio; }
    function color(d) { return d.name; }
    function key(d) { return d.name; }

>>>>>>> origin/master
    // Chart dimensions. dimensiones de la tabla dentro de su zona.
    var margin = {top: 19.5, right: 19.5, bottom: 20.5, left: 39.5},
        width = 960 - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([0, 10]).range([0, width]),//no aparecen los valores de la x !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        yScale = d3.scale.linear().domain([0, 1]).range([height, 0]),
        radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
        colorScale = d3.scale.category20c();

    // The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    // Create the SVG container and set the origin.
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add an x-axis label.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("");

    // Add a y-axis label.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Radiation (x 1e15)");

<<<<<<< HEAD
    // Add the year label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "year label")
=======
    // Add the day label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "day label")
>>>>>>> origin/master
        .attr("text-anchor", "start")
        .attr("y", 28)
        .attr("x", 30)
        .text(0);

    // Load the data.
    d3.json("radiologic.json", function(nations) {

      // A bisector since many nation's data is sparsely-defined.
      var bisect = d3.bisector(function(d) { return d[0]; });

      // Positions the dots based on data.
      function position(dot) {
        dot .attr("cx", function(d) { return xScale(x(d)); })
            .attr("cy", function(d) { return yScale(y(d)); })
            .attr("r", function(d) { return radiusScale(radius(d)); });
      }

      // Defines a sort order so that the smallest dots are drawn on top.
      function order(a, b) {
        return radius(b) - radius(a);
      }
<<<<<<< HEAD
      // Interpolates the dataset for the given (fractional) year.
      function interpolateData(year) {
        sharedObject.yearData = nations.map(function(d) {
			
		
          return {
            name: d.name,
            //region: d.region,
            //income: interpolateValues(d.radio[0][1], d.radio[1][0]),
			income: d.radio[0][1],
            //population: interpolateValues(d.population, year),
           // lifeExpectancy: interpolateValues(d.lifeExpectancy, year),
            lat: d.lat,
            lon: d.lon


          };
        });

        return sharedObject.yearData;
=======
      // Interpolates the dataset for the given (fractional) day.
      function interpolateData(day) {
        sharedObject.dayData = nations.map(function(d) {
          return {
            name: d.name,
            //region: d.region,
            income: interpolateValues(d.radio, day),
            //population: interpolateValues(d.population, day),
           // lifeExpectancy: interpolateValues(d.lifeExpectancy, day),
            lat: d.lat,
            lon: d.lon
          };
        });

        return sharedObject.dayData;
>>>>>>> origin/master
      }

      // Add a dot per nation. Initialize the data at 0, and set the colors.
      var dot = svg.append("g")
          .attr("class", "dots")
        .selectAll(".dot")
          .data(interpolateData(0))
        .enter().append("circle")
          .attr("class", "dot")
          .style("fill", function(d) { return colorScale(color(d)); })
          .call(position)
          .sort(order)
		  .on("mouseover", function(d) { 
				sharedObject.dispatch.nationMouseover(d); 
		  })
          .on("click", function(d){
              sharedObject.flyTo(d);
          });

      // Add a title.
      dot.append("title")
          .text(function(d) { return d.name; });


<<<<<<< HEAD

      // Updates the display to show the specified year.
      function displayDay(year) {
        dot.data(interpolateData(year), key).call(position).sort(order);
        label.text(Math.round(year));
      }
		
	
=======
      // Tweens the entire chart by first tweening the day, and then the data.
      // For the interpolated data, the dots and label are redrawn.
      function tweenDay() {
        var day = d3.interpolateNumber(0, 5);
        return function(t) { displayDay(day(t)); };
      }

      // Updates the display to show the specified day.
      function displayDay(day) {
        dot.data(interpolateData(day), key).call(position).sort(order);
        label.text(Math.round(day));
      }
		
		function (time){
			console.log(Cesium.clock.currentTime);	
		}
>>>>>>> origin/master
		
      // make displayDay global
      window.displayDay = displayDay;

<<<<<<< HEAD
      // Finds (and possibly interpolates) the value for the specified year.
      function interpolateValues(values, year) {
		console.log(year);
		console.log(values);
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
          var b = values[i - 1],
              t = (year - a[0]) / (b[0] - a[0]);
=======
      // Finds (and possibly interpolates) the value for the specified day.
      function interpolateValues(values, day) {
        var i = bisect.left(values, day, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
          var b = values[i - 1],
              t = (day - a[0]) / (b[0] - a[0]);
>>>>>>> origin/master
          return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
      }

      sharedObject.dispatch.on("nationMouseover.d3", function(nationObject) {
          dot.style("fill", function(d) {
                 if (typeof nationObject !== 'undefined' && d.name === nationObject.name) {
                     return "#00FF00";
                 }

                 return colorScale(color(d));
                 });
				 
				 
      });
    });
}());