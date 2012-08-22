$("./body") {
  add_class("mw-browse")

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
          text() {
            replace(/>/,"»")
          }
        }
      }
    } // end Transform Breadcrumbs

    // Page Content
    $("./div[@id='content']//div[@class='page-content']") {
      $("./div[@class='paging-bar-top'][2]") {
        remove()
      }
      $("./div[@class='paging-bar'][1]") {
        remove()
      }


      // Pagination (Bottom)
      $("./div[@class='paging-bar']") {
        $("./div[contains(@class,'page-number-row')]") {
          // Middle Number is selected
          $("./div[@class='paging-button-current']") {
            add_class("visible")
            $("following-sibling::div[@class='paging-button'][1]") {
              add_class("visible")
            }
            $("preceding-sibling::div[@class='paging-button'][1]") {
              add_class("visible")
            }
          }
          // First number is selected
          $("./div[contains(@class,'paging-button-current') and position()=1]") {
            $("following-sibling::div[contains(@class,'paging-button')][2]") {
              add_class("visible")
            }
          }
          // Last number is selected
          $("./div[contains(@class,'paging-button-current') and position()=last()]") {
            $("preceding-sibling::div[contains(@class,'paging-button')][2]") {
              add_class("visible")
            }
          }
        }

        // View All Button
        $("./div[@class='paging-next-bar']/div[contains(@class,'paging-view-all')]") {
          move_to("../..", "top")
        }

        $("./div[@class='paging-next-bar'] | div[@class='paging-previous-bar']") {
          remove()
        }
      }
    }


    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
