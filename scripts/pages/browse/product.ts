$("./body") {
  add_class("mw-product")

  $(".//div[@id='main']") {
    
    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $("./div[@id='breadcrumb-left']") {
        $("./div[@id='breadcrumb-text']") {
          $("./*[not(position()=last())]") {
            remove()
          }
          $("./*") {
            move_to("../..", "top")
          }
        }
        $("./span[contains(@class,'blue')]") {
          $("./a") {
            move_to("../..", "top")
          }
          text() {
            replace(/>/,"»")
          }
        }
      }
    } // end Transform Breadcrumbs

    // Content
    $("./div[@id='content']") {

      $("./div[@id='stuff']/div[@id='prod-info-left']") {
        // Product Title
        $("./div[@id='info-product']") {
          move_to("..", "top")
        }  

        $("./div[@id='top']") {

          // Product Image
          $("./div[@id='info-image']") {
             
          }

          // Product Info
          $("./div[@id='info-text']") {
            // If any of the p's are empty, remove all spaces
            $("./p[not(@id='info-main-prod-buy-now')]") {
              text() {
                replace(/\A\s*\z/,"")
                replace(/Sale:\s/,"")
              }
            }

            $("./p[@id='info-main-prod-buy-now']/a") {
              inject("ADD TO CART")
            }
            // Product #
            $("./p[@id='info-sku']") {
              // Move the Product # into the image container
              move_to("./ancestor::div[@id='top']/div[@id='info-image']","bottom")
            } 
          }
        }


        // Additional Products
        $("./div[@class='info-table']") {
          $("./form/table") {
            // Labels 
            $("./tr[@class='header-row']") {
              $("./th") {
                name("div")
              }
              name("div")
              wrap("div", class:"mw-additional") {
                insert_top("div", class:"mw-product_num_header")
                move_to("ancestor::div[@class='info-table']")
              }
            } 

            // Info
            $("./tr[@class='info-row']") {
              $("./td") {
                name("div")
                text() {
                  replace(/\A\z/,"-")
                }
              }
              name("div")
              move_to("ancestor::div[@class='info-table']/div["+index()+"]", "bottom")
            } 

            // Buttons
            $("./tr[@class='button-row']") {
              $("./td") {
                name("div")
              }
              name("div")
              move_to("ancestor::div[@class='info-table']/div["+index()+"]", "bottom")
            } 
          }

          $("./form") {
            remove()
          }

          // Move out product No & Label
          $(".//div[@class='info-row']/div[4]") {
            add_class("mw-prod_num")
            move_to("ancestor::div[@class='mw-additional']/div[@class='mw-product_num_header']", "top")
          }
          $(".//div[contains(@class, 'sku')]") {
            add_class("mw-prod_num_label")
            move_to("ancestor::div[@class='mw-additional']/div[@class='mw-product_num_header']", "top")
          }
        }
      }

      // Label Info
      $("./div[@id='stuff']/div[@id='prod-info-right']") {
        attributes(data-ur-set:"toggler")
        // Label Info Button
        $("./div[@id='top-tabs']") {
          attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")

          $("./a") {
            remove()
          }

          inject("BUTTON1")

        }  
        // Label Info Content
        $("./div[@id='tab-info']") {
          attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
        }  
      }

      // Reviews
      $(".//div[@id='BVRRContainer']") {
        attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
        
        wrap("div", class:'mw-reviews_toggler') {
          attributes(data-ur-set:"toggler")
          insert_top("div", class:'mw-reviews_button') {
            attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")
            inject("BUTTON2")
          }
        }  
      }
    }

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
