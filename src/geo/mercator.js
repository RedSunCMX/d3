d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250];

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_radians / 2)) / d3_radians) / 360;
    return [
      scale * x + translate[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1]
    ];
  }

  mercator.invert = function(xy) {
    var lon = 360 * (xy[0] - translate[0]) / scale,
        lat = -360 * (xy[1] - translate[1]) / scale;
    return [
      lon,
      2 * Math.atan(Math.exp(lat * d3_radians)) / d3_radians - 90
    ];
  };

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  return mercator;
};
