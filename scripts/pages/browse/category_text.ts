$("./body") {
  add_class("mw-category_text")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $(".//span[contains(@class,'blue')]") {
        $("./a") {
          move_to("../..", "top")
        }

        text() {
          replace(/>/,"»")
        }
      }
    }


    $(".//div[@id='page-content']") {

      $("./a[contains(@name,'anchor_')]") {
        name("div")
      }
      
      $("./div[contains(@name,'anchor_')]") {
        //log(fetch("@name"))
        //log(concat("following-sibling::div[@class='category' and count(preceding::a[contains(@name,'anchor_')]) = ", index() , "]"))
        
        move_here(concat("following-sibling::div[@class='category' and count(preceding::div[contains(@name,'anchor_')]) = ", index() , "]"), "bottom") 
      }

      $("./a[@class='top-of-page-link']") {
        #remove()
      }


      // Fix for 'seeds' being in a strong
      $("./div/strong/a") {
        #move_to("../..")
      }

      $("./div/a") {
        #add_class("mw_bar1")
      }
    }



    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
