$("./body") {
  add_class("mw-browse")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $("./div[@id='breadcrumb-left']") {
        $("./div[@id='breadcrumb-text']") {
          $("./*[not(position()=last())]") {
            remove()
          }
          $("./*") {
            move_to("../..", "top")
          }
          text() {
            replace(/>/,"»")
          }
        }
      }
    }

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
