function publishStory() {
  FB.ui({
    method: 'feed',
    name: 'STORY_NAME',
    caption: 'STORY_CAPTION',
    description: 'STORY_DESCRIPTION',
    link: 'STORY_LINK',
    picture: 'STORY_PICTURE_URL'
  }, 
  function(response) {
    console.log('publishStory response: ', response);
  });
  return false;
}
