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
    insert_bottom("a", class:"mw-find_a_store", href:'google.com') {
      insert("span", class:"mw-find_icon icons-find") 
      insert("span", class:"mw-find_label", "Find A Store") 
    }
    
    // Remove everything that isn't prefixed with mw-
    $("./*[not(contains(@class,'mw-'))]") {
      remove()
    }


  }
}