//Prompt the user to grant the check-in permission
function promptCheckInPermission() {
  FB.login(function(response) {
    if (response.authResponse) {
      //User granted permissions
      document.body.setAttribute("checkin","true")
    } 
    else {
      //User didn't grant permissions
      document.body.setAttribute("checkin","false")
      alert('You need to grant the check-in permission before using this functionality.');
    }
  }, {scope:'user_checkins,publish_checkins'});
}
