//= require_tree .

var map;
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.986682, lng: 138.691938},
    zoom: 10
  });

  var marker = new google.maps.Marker({
    position: {lat: -35.0655083, lng: 138.75600800000007},
    map: map
  });
}
