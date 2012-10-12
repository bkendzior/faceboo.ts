function updateUserInfo(response) {
   FB.api('/me', function(response) {
     document.getElementById('USER_INFO').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
   });
 }
