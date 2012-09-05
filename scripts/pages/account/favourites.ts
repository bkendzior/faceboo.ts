$("./body") {
  add_class("mw-favourites")

  // Fav Table
  $(".//div[@class='accountMain']/table") {
    name("div")
    add_class("mw-table")

    $(".//tr") {
      name("div")
      add_class("mw-table_item")
    }

    $(".//td | .//tbody | .//tfoot") {
      name("div")
    }

    $(".//thead") {
      remove()
    }



    // Add to basket, remove from favorites  
    $(".//a[@class='bluebutton']") {
      add_class("mw_btn4 mw-account_btn")
      
      $("./ancestor::div[1]") {
        add_class("mw-trailer")
      }
    }
  }

}
