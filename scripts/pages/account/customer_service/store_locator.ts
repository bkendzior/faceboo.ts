$("./body") {
  add_class("mw-store_locator")

  attribute("checkin", "false")

  $(".//table[@class='stores']") {
    // Grabs the "view map" link and attaches it to the address to save space
    $(".//td[position()=4]/a") {
      $map_link = fetch("@href")
      log($map_link)
      $("ancestor::tr[1]/td[position()=1]/span") {
        name("a")
        attribute("href",$map_link)
      }
    }
  }

  // Change "click here" to "tap here"
  $(".//form[@id='locator']") {
    $(".//p") {
      wrap_text_children("a")

      $("./a[1]") {
        text() {
          replace(/click/,"tap")
        }
      }
    }

    insert_bottom("div", id:"mw_loc") {
      //Prompt for checkins
      faceboots_inject_prompt_checkin()
      insert_bottom("a",id:'prompt_checkin', "Click to enable checkins", onclick:"promptCheckInPermission()")

        // Show Checkins
      insert_bottom("div", id:'nearby-container') {
        faceboots_inject_get_nearby(fetch("@id"))
      }
      insert_bottom("a",id:"get_nearby","Get Nearby", onclick:"getNearby();")

      //Check In
      insert_bottom("div", id:'checkin-container') {
        faceboots_inject_check_in(fetch("@id"))
      }
      insert_bottom("a",id:"check_in","Show your checkins", onclick:"getCheckIns();")
      insert_bottom("a",id:"check_in_go","Check yourself in", onclick:"checkin();")
    }
  }
}
