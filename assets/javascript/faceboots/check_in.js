//Get the user's check-ins
function getCheckIns() {
  FB.api('/me/checkins', function(response) {
    console.log('Got your check-ins: ', response);
    
    if (!response.error) {
      displayCheckIns(response.data, document.getElementById('CHECKIN_CONTAINER'));
    }
  });
}

//Display the user's check-ins
function displayCheckIns(checkins, dom) {
  var markup = '<div class="data-header">Your last five check-ins:</div>';
  
  for (var i=0; i < checkins.length && i < 5; i++) {
    var checkin = checkins[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + checkin.place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + checkin.place.name + '</div>'
        + '  <div class="check-in-msg">' + (checkin.message || '') + '</div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}


//Check the user into the place
function checkin(id) {
  var params = {
    method: 'POST',
    place: id,
    coordinates: {
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude
    },
    message: ''
  };

  console.log('Checking you into using the following params: ', params);
  
  FB.api('/me/checkins', params,
    function(response) {
      console.log('Checked you into the place, here\'s the response: ', response);
    }
  );
}
