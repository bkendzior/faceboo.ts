$("./body//div[@id='header']") {
  add_class("mw_header")

  insert_bottom("div", class:'mw_top_header') {
    // Cart
    move_here("./div[@id='header-basket-hb']/div[@id='minibasket-bar']/div[@class='mb-totalitems']/a/strong/span") {
      
    }
    
    // Phone Number
    insert_bottom("div", class:"mw_phone_number") {
      insert_bottom("div", class:"icons-phone")
      insert_bottom("a", class:"mw_pnum", "0870 606 6605")
    }
  }
}