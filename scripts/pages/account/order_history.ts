$("./body") {
  add_class("mw-order_history")


  $(".//div[@class='accountMain']") {
    $("./table") {

      $(".//td/a") {
        text() {
          replace(/(\sdetails|>)/,"")
        }  
      }
    }
  }
}
