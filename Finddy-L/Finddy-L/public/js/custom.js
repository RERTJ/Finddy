/* Write here your custom javascript codes */

/*validate entries in search.html*/
jQuery(document).ready(function(){
  $('#search').click(function(){
      var sttMin = $("#start_min option:selected").val();
      var sttHr = $("#start_hour option:selected").val();
      var expMin = $("#expire_min option:selected").val();
      var expHr = $("#expire_hour option:selected").val();
      var fin = $('#finish').val();
      var stt = $('#start').val();
      if (fin==''||stt=='')
        alert('Please select both start and expiration dates!');
      else if (sttMin=='NA'||sttHr=='NA'||expMin=='NA'||expHr=='NA') {
        alert('Please select specific time range!');
      } else
        return;
  });
});

/*validate entries in createNew.html*/
jQuery(document).ready(function(){
  $('#createNew').click(function(){
    var sttMin = $("select[name=start_min] option:selected").val();
    var sttHr = $("select[name=start_hour] option:selected").val();
    var expMin = $("select[name=expire_min] option:selected").val();
    var expHr = $("select[name=expire_hour] option:selected").val();
    var fin = $('#finish').val();
    var stt = $('#start').val();
    if (fin==''||stt=='')
      alert('Please select both start and expiration dates!');
    else if (sttMin=='NA'||sttHr=='NA'||expMin=='NA'||expHr=='NA') {
      alert('Please select specific start and expiration time!');
    } else
      alert("You've successfully created a new activity");
  });
});

/*confirm entries in registration page*/
jQuery(document).ready(function() {
  $('#register').click(function(){
    var pass = $('#password').val();
    var pass2 = $('#repassword').val();
    var username = $('#username').val();
    var email = $('#email').val();
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (username == "")
      alert('Please enter a username');
    else if (email == "")
      alert('Please enter an email address');
    else if (!re.test(email))
      alert('Please enter a valid email');
    else if (pass == '')
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
	$('.info-save').click(function(){
		var mobile = $('#mobile').val();
    var username = $('#username').val();
    var selfIntro = $('#selfIntro').val();
		if (mobile == ""||username==""||selfIntro==""){
      alert('Please fill in all blanks');
    } else if (isNaN(mobile) || Number(mobile) < 10000000 || Number(mobile) > 99999999)
			alert('Please enter a valid mobile phone number according to example!');
    else
      return;
	});
});

/*confirm passwords in manageProfile page*/
jQuery(document).ready(function(){
  $('.pw-save').click(function(){
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
  $('#cancelPw').click(function(){
    $('#password').val('');
    $('#repassword').val('');
  });

  $('#cancelAcctIntro').click(function(){
    $('#username').val('');
    $('#selfIntro').val('');
    $('#mobile').val('');
  });
});

/*function for google map API*/
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.4203, lng: 114.2067},
    zoom: 13
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
    document.getElementById('location').value = place.formatted_address;
    document.getElementById('locationID').value = place.place_id;
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address);
    infowindow.open(map, marker);

  });
}
