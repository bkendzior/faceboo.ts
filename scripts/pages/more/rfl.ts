$("./body") {
  add_class("mw-rfl")


  // View my points form 
  $(".//div[@id='MyPointsBalance']/form") {
  
    $(".//input[@id='btnCheckMyPoints']") {
      %title = fetch("@title")
      attribute("value", %title)
    }
  }
}
