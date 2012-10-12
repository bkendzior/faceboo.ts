function sendRequest() {
  FB.ui({
    method: 'apprequests',
    message: 'MESSAGE',
  }, 
  function(response) {
    console.log('sendRequest response: ', response);
  });
}
