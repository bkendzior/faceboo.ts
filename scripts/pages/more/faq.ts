$("./body") {
  add_class("mw-faq")

  $(".//div[@class='infocentrenav']") {
    $(".//a") {
      insert_bottom("div", class:"mw-arrow_icon")
    }
  }
}
