$("./body") {
  add_class("mw-more_base")

  // Edit the breadcrumb
  $(".//div[@id='breadcrumbs']") {

    $(".//span[contains(@class,'blue')]") {
    
      $("./a") {
        wrap("div",class:"mw-breadcrumb") {
          move_to("ancestor::div[@id='breadcrumbs']", "top")
        }
      }
      text() {
        replace(/>/,"»")
      }

    }

    $("./div[@id='breadcrumb-left']") {
      move_to("ancestor::div[@id='breadcrumbs']/div[@class='mw-breadcrumb']","bottom") 
    }
  } // end Breadcrumb 
}
