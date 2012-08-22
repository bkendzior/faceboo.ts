$("./body") {
  add_class("mw-product")

  $(".//div[@id='main']") {

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
