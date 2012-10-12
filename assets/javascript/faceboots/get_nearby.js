//Get locations near the user
function getNearby() {
  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    curLocation = location;
    console.log(location);

    // Use graph API to search nearby places
    var path = '/search?type=place&center=' + location.coords.latitude + ',' + location.coords.longitude + '&distance=1000';
    
    FB.api(path, function(response) {
      console.log('Got some places near you: ', response);
      if (!response.error) {
        displayPlaces(response.data, document.getElementById('NEARBY_CONTAINER'));
      }
    });
  });
}


//Display the local places that the user can check into
function displayPlaces(places, dom) {
  var markup = '<div class="data-header">Nearby locations:</div>';
  
  for (var i=0; i < places.length && i < 5; i++) {
    var place = places[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + place.name + '</div>'
        + '  <div class="check-in-button"><input type="button" value="Check in" onclick="checkin(' + place.id + ')" /></div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}
