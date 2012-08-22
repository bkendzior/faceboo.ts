$("./body") {
  add_class("mw-category_image")

  $(".//div[@id='main']") {

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
