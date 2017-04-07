/* Write here your custom javascript codes */
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.093275, lng: 114.301758},
    zoom: 8
  });
}
