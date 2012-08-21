$("./body") {
  add_class("mw-home")
  
  // All the site content is in this div 
  $(".//div[@id='main']") {
    // Carousel

    // Rewards for life box
    insert_bottom("div", class:'mw-rewards') {
      // Box header
      insert_bottom("div", class:"mw-rewards_head mw_box1_head", "Rewards for life")

      // Box Content
      insert_bottom("div", class:"mw-rewards_body mw_box1") {
        inject("Start collecting points today")
      
        // Activate now | Find out More
        insert_bottom("div") {
          move_here("ancestor::div[@id='main']/div[@id='content']//a[@id='hp-box3-3']")
          move_here("ancestor::div[@id='main']//div[@id='cat-box3']/h3/div/a[position()=last()]") {
            text() {
              replace(/\A.*\z/,"Find out more") 
            }
          }
        }
      }
    }

    // Qualified to advise box
    insert_bottom("div", class:'mw-qualified') {
      // Box header
      insert_bottom("div", class:"mw-qualified_head mw_box1_head", "Qualified to advise")

      // Box Content
      insert_bottom("div", class:"mw-qualified_body mw_box1") {
        inject("What ever your question, you can talk to our advisors about our products.")
      
        // Find out More
        insert_bottom("div") {
          move_here("ancestor::div[@id='main']//div[@id='cat-box3']/h3/div/a[position()=last()]") {
            text() {
              replace(/\A.*\z/,"Find out more") 
            }
          }
        }
      }
    }
    
    // Sign up for our weekly offer Email
    move_here(".//div[@id='signup']/a") {
      attributes(class:"mw-email_offer")
      inject("Sign up for our weekly offer email") 
      remove("./img") 
    }

    // Like us on facebook - Share on Twitter
    insert_bottom("div", class:"mw-social_share") {
      insert_bottom("a", class:"mw-social_facebook", "Like us on Facebook", href:'http://www.facebook.com/hollandandbarrett')

      insert_bottom("a", class:"mw-social_twitter", "Share on Twitter", href:'http://twitter.com/intent/user?screen_name=holland_barrett')
    }


    $("div[@id='content'] | div[@id='menu']") {
      remove()
    }
  }
}