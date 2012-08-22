$("./body") {
  add_class("mw-category_text")

  $(".//div[@id='main']") {

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
