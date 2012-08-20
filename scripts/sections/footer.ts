$("./body//div[@id='container']"){
  $("./div[@id='footer']") {
    add_class("mw-footer")
    
    move_here("../div[contains(@class,'center')]", "bottom")
    move_here("../div[@class='legalNote']", "bottom")
    move_here("../div[@id='FooterAwards']", "bottom")

    // Sign Up For Email Specials
    // -- had to hardcode it because link doesn't appear on cart pages etc...
    insert_bottom("a", class:"mw-email_special", href:'/account/personaldetails/newsletter', "Sign Up For Email Specials")

    // Customer Services
    insert_bottom("a", class:"mw-customer_service mw-h3", "Customer services")
    
    // My Account | My favourites | Shipping & returns
    insert_bottom("div", class:"mw-acc_footer_bar") {
      // My Account
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Edit Your Account Details')]") {
        text() {
          set("My Account")
        } 
      }

      // My favourites
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Your Favourites')]") {
        text() {
          set("My favourites")
        } 
      }

      // Shipping & returns
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Shipping And Returns')]") {
        text() {
          set("Shipping & returns")
        } 
      }
    }

    // Contact us | Site feedback | FAQ's
    insert_bottom("div", class:"mw-contact_footer_bar") {
      // Contact us 
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Contact Us')]") {
        text() {
          set("Contact us")
        } 
      }

      // Site feedback 
      // -- had to hardcode it because link doesn't appear on cart pages etc...
      insert_bottom("a", class:"mw-site_feedback", href:'/account/personaldetails/newsletter', "Site feedback")


      // FAQ's
      move_here("ancestor::div[@id='container']/div[@id='header']/ul/li/a/span[contains(text(),'FAQs')]/..") {
        text() {
          set("FAQ's")
        }
        $("./span") {
          remove()
        }
      }
    }

    // Copyright Holland & Barrett Retail Limited, 2012
    // All rights reserved
    $("./div[@class='legalNote']") {
      name("a")


      // Regex to extract the parts of the desktop footer that we want to keep
      text() {
        replace(/^(.*HollandAndBarrett.*|.*Registered.*)$/, "")
        replace(/All\srights\sreserved\./,"") 
        replace(/\s\s/,"")
      }

      wrap("div", class:'mw-copyright') {
        insert_bottom("a", class:"mw-rights", "All rights reserved.")
        move_to("..", "bottom")
      }

    }

    // Remove everything that isn't prefixed with mw-
    $("./*[not(contains(@class,'mw-'))]") {
      remove()
    }
  }
}
