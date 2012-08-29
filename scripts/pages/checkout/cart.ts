$("./body") {
  add_class("mw-cart")

  $(".//div[@id='content']") {
    // 
    $(".//div[@id='basket-text']") {
      $("./p") {
        move_to("ancestor::div[@id='basket-text-top']")
      }
      remove()
    }
  
    // Product information form
    $(".//form") {
    
      // Basket buttons
      $("./div[@class='basket-buttons']") {
        $("./a[@class='continue2']") {
          move_to("..","bottom") 
          inject("Continue Shopping")
          add_class("mw_btn2")
        }

        $("./div[@class='basket-checkout-pad']/input") {
          btn_delegate() {
            add_class("mw_btn3")
          } 
        }
      }

      // Item Table
      $("./table") {
        name("div")
        
        $(".//td | .//tr | .//tbody | .//thead | .//tfoot") {
          name("div")
        }

        // Update Button
        $(".//div[@class='update-row']") {
          $(".//input"){
            attributes(alt:'update quantities')
            btn_delegate() {
              add_class('mw_btn4')
            }
          }
        }
        // Free Shipping Button
        $(".//div[@class='free-ship-message']"){
          move_to("ancestor::div[@id='basket']/div[@class='update-row']", "after") 

          $("./div[@class='buy-more-button']/a") {
            inject("Add More Items")
          }
        }

        // Buy another half-price
        $(".//div[@class='red bold center']") {
          move_to("../div[@class='update-row']", "after")
        }

        // Individual items
        $(".//div[@class='row']") {
          // Quantity
          $("./div[@class='basket-item-quantity']") {
            insert_top("a", class:'mw-label', "Quantity") 
          }

          // RRP
          $("./div[@class='basket-item-price'][1]") {
            add_class("mw-rrp")

            $price = fetch("text()")
            text() { replace(/.*/,"") } // Clear the text
            insert_top("a", class:'mw-label', "RRP")
            insert_bottom("a", class:'mw-price', $price)
          }

          // You Pay 
          $("./div[@class='basket-item-price'][1]") {
            add_class("mw-you_pay")

            $price = fetch("text()")
            text() { replace(/.*/,"") } // Clear the text
            insert_top("a", class:'mw-label', "You Pay") 
            insert_bottom("a", class:'mw-price', $price)
          }

          // Trash
          $("./div[@class='basket-item-remove']") {
            $("./a") {
              add_class("icons-trash") 
              remove("./img")
            }
            move_to("../div[@class='basket-item-quantity']","bottom")
          }
        }

      }
    }
  }
}
