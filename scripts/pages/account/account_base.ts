$("./body") {
  add_class("mw-account_base")

  $(".//div[@id='main']/div[@id='content']") {

    // Edit the breadcrumb
    $("./div[@class='breadcrumb']") {
      // Remove all but the last linked breadcrumb
      $('./a[not(position()=last())]') {
        remove()
      } 

      $("./a") {
        wrap("div",class:"mw-breadcrumb") {
          move_to("ancestor::div[@class='breadcrumb']", "before")
        }
      }

      text() {
        replace(/\s\/\s/,"")
        prepend(" » ")
      }

      move_to("ancestor::div[@id='content']/div[@class='mw-breadcrumb']", "bottom")
    } // end Breadcrumb 

    // Customer Services Nav
    $("./div[@class='accountLeft']") {
      add_class("mw-cust_serve")
      attributes(data-ur-set:"toggler")

      // Button
      $("./div[@class='header']/h2") {
        attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")
        add_class("mw_btn1")
      } 

      // Links
      $("./ul[@class='navLinks']") {
        attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
      }

      // Remove the large nav buttons and turn them into list items
      $("./div[@class='largeNavButton']") {
        $("./a/img") {
          $alt_text = fetch("@alt")
          $("ancestor::a[1]") {
            inject($alt_text)
          }
          remove()
        }
        name("li")
        move_to("../ul","bottom") 
      }
    } // end Customer Services 


    // Account Main
    $("./div[@class='accountMain']") {
      // Headings
      $(".//h1[contains(@class,'corner-tl')]") {
        add_class("mw-heading")
      }

      // Green Button
      $(".//a[@class='greenbutton']") {
        add_class("mw_btn3 mw-account_btn")
      }

      // Blue Button
      $(".//div[@class='blueSlidingButton']/input") {
        add_class("mw_btn4 mw-account_btn")
      }
    }
    
    // Blue Logout Button
    $(".//a[@class='bluebutton']") {
      add_class("mw_btn4 mw-account_btn")
      move_to("ancestor::div[@id='main']//div[@class='accountMain']","top")
    }
  } 

  // Simple header for checkout flow
  $(".//div[@id='simple-header']") {
    add_class("mw-simple_header")
    move_to("..//div[@class='mw-breadcrumb']", "after")
    $("./h1") {
      remove()
    }
  }
}
