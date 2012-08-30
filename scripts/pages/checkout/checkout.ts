$("./body") {
  add_class("mw-checkout")


  $(".//div[@id='main']") {


    $(".//div[@id='checkout-main']") {

      $(".//*") {
        attribute("style", "")
      }

      // Billing & Shipping Address
      $("./div[contains(@id,'billing-add-col1')]") {
        move_here("../div[@id='billing-add-col2']","top") {
          $("./a") {
            inject("Update") 
          } 
        }
        move_to("../div[@id='payment-address-bill']","before")
      }
      $("./div[contains(@id,'shipping-add-col1')]") {
        move_here("../div[@id='shipping-add-col2']","top") {
          $("./a") {
            inject("Update") 
          } 
        }
        move_to("../div[@id='payment-address-shipp']","before")
      }

      $("./div[contains(@id,'-col2')]/a") {
      }

      // What your are ordering
      log_page('pages/checkout/basket.ts', $curr_file)
      @import basket.ts

      // Payment Form
      $("./form[@id='frmPayment']") {
      
        $("./div[@id='payment-info-box']") {
          $("./p/input") {
            btn_delegate() {
              add_class("mw-confirm_order")
              inject("CONFIRM ORDER")
            }
          }
        } 
      }
    }
  }
}
