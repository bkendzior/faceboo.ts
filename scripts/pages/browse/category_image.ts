$("./body") {
  add_class("mw-category_image")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $(".//div[contains(@class,'blue')]") {
        $("./a") {
          move_to("../..", "top")
        }

        text() {
          replace(/home\s>/i,"")
          replace(/>/,"»")
        }
      }
    }

    $("./div[@id='content']") {
    
      // Replace the images with their alt_text
      $("./img") {
        $alt_text = fetch("@alt")
        $("..") {
          insert_top("a") {
            add_class("mw_h2")
            inject($alt_text)
          }
        }
        remove()
      }

      // Bodybuilding
      $("./div[@id='main-box']") {
        $(".//img") {
          $alt_text = fetch("@alt")
          $("..") {
            inject($alt_text)
            insert_bottom("div")
          }
          remove()
        }
      }
      
      $(".//a[contains(@class,'clickbox')]") {
        insert_bottom("div") // Inserted for the chevron icon 
      }

    }

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
