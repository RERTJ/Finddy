/* Write here your custom javascript codes */

/*confirm password in registration page*/
jQuery(document).ready(function() {
        $('#register').click(function(){
            var pass = $('#password').val();
            var pass2 = $('#repassword').val();
            if (pass == '')
                alert('Please enter a password');
            else if (pass2 == '')
                alert('Please re-enter the password');
            else if (pass != pass2)
                alert('The passwords do not match!');
            else
            	window.location.href = "login.html";

        });  
});

/*confirm phone number in manageProfile page*/
jQuery(document).ready(function(){
	$('.save').click(function(){
		var mobile = $('#mobile').val();
		if (mobile == "")
      return;
    if (isNaN(mobile) || Number(mobile) < 10000000 || Number(mobile) > 99999999)
			alert('Please enter a valid mobile phone number according to example!');
	});	
});

/*confirm passwords in manageProfile page*/
jQuery(document).ready(function(){
  $('.save').click(function(){
      var pass = $('#password').val();
      var pass2 = $('#repassword').val();
      if (pass == '')
        return;
      else {
        if (pass2 == '')
          alert('Please re-enter the password');
        else if (pass != pass2)
          alert('The passwords do not match!');
        else
          return;
      }
  });
});

/*clear all input in blanks once cancel button is pressed in manageProfile page*/
jQuery(document).ready(function(){
  $('#cancelAccountInfo').click(function(){
    $('#username').val('');
    $('#password').val('');
    $('#repassword').val('');
    $('#mobile').val('');
  });

  $('#cancelSelfIntro').click(function(){
    $('#selfIntro').val('');
  });
});

/*function for google map API*/
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.093275, lng: 114.301758},
    zoom: 10
  });

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address);
    infowindow.open(map, marker);
  });
}