$("./body//div[@id='container']"){
  $("./div[@id='header']") {
    add_class("mw-header")

    insert_bottom("div", class:'mw-top_header') {
      // Phone Number
      insert_bottom("div", class:"mw-phone_number") {
        insert_bottom("div", class:"icons-phone")
        insert_bottom("a", class:"mw-pnum", "0870 606 6605", href:"tel:08706066605")
      }
        
      // Basket
      insert_bottom("div", class:"mw-basket") {
        insert_bottom("div", class:"icons-basket")
        // Label for basket - e.g. '3 items'
        move_here("./ancestor::div[@id='header']/div[@id='header-basket-hb']/div[@id='minibasket-bar']/div[@class='mb-totalitems']/a") {
          add_class("mw-basket_label") 
        }
      }

    }

    // Find a store button
    $("./p[@id='header-store']/a") {
      $find_store = fetch("@href")
    }
    insert_bottom("a", class:"mw-find_a_store", href:$find_store) {
    //insert("span", class:"mw-find_icon icons-pin") 
      insert("span", class:"mw-find_label", "Find A Store") 
    }

    // H&B Logo
    insert_bottom("a", class:"mw-header-logo", href:'/') {
      insert("span", class:"icons-header") 
    }
   
    insert_bottom("div", class:"mw-search_box") {
      move_here("./ancestor::div[@id='header']/form[@id='searchform']") {
        // Remove the header banner
        remove("./p[@id='header-banner']")
        
        // Add 'go' text to search button
        $(".//input[@type='submit']") {
          attributes(value:'Go')
        }
      }
    }

    // Browse the Store
    insert_bottom("div", class:"mw-browse") {
      attributes(data-ur-set:"toggler")
      
      // Browse toggler button
      insert_bottom("a", class:'mw-browse_button', "Browse the store") {
        add_class("mw_bar3")
        attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")
        // TODO: Arrow Icon
        insert_bottom("div", class:"mw-arrow")
      }
      
      insert_bottom("div", class:'mw-browse_contents') {
        attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
        //Vitamin Supplements
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-multivits']")
        //Food & drink
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-food']")
        //Sports nutrition
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-bodybuild']")
        //Weight loss
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-diet']")
        //Toileteries
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-toilet']")
        //Offers
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav']/li/a[@id='header-nav-pom']")
      }
    }
    

    // Remove everything that isn't prefixed with mw-
    $("./*[not(contains(@class,'mw-'))]") {
      remove()
    }
  }
}