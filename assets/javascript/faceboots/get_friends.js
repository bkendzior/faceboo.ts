function getUserFriends() {
  FB.api('/me/friends&fields=name,picture', function(response) {
    //console.log('Got friends: ', response);

    if (!response.error) {
     var markup = '';

     var friends = response.data;

     for (var i=0; i < friends.length && i < 25; i++) {
       var friend = friends[i];

       markup += '<img src="' + friend.picture.data.url + '"> ' + friend.name + '<br>';
     }

     document.getElementById('YOUR_FRIENDS_CONTAINER').innerHTML = markup;
    }
  });
}
