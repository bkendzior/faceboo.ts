// Load the SDK Asynchronously
//
// Reference:
// https://developers.facebook.com/docs/reference/javascript/FB.init/
//
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

// Init the SDK upon load
window.fbAsyncInit = function() {
  FB.init({
    appId      : 'YOUR_APP_ID', // App ID
    channelUrl : 'YOUR_CHANNEL_URL', // Path to your Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Check login status on page load
  FB.getLoginStatus(handleStatusChange, true);

  // Subscribe to status change events
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}; 

function handleStatusChange(response) {
  // Switch the login status
  response.authResponse ? document.body.setAttribute("fb_connected", "true") : document.body.setAttribute("fb_connected", "false"); 

  // Force redraw
  document.body.offsetHeight;

  if (response.authResponse) {
    console.log(response);

    //UPDATE_USER_INFO
  }
}
