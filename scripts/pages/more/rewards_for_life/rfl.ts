$("./body") {
  add_class("mw-rfl")

  // View my points form 
  $(".//div[@id='MyPointsBalance']/form") {
  
    $(".//input[@id='btnCheckMyPoints']") {
      %title = fetch("@title")
      attribute("value", %title)
    }
  }

  // Loyalty links
  $(".//div[@id='loyalty-landing-links']//li/a") {
    insert_bottom("div", class:"mw-chevron")
  }
}
