//  To track a page with the moovwebanalytics package, set $mw_analytics = 'true'
//  and make sure the $page_name variable is being correctly set (this is what
//  will be reported in mw_analytics.ts)
$mw_analytics = "false"
$curr_file = "mappings.ts"

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")
    $page_name = ""

    match($path) {
    
      // ---------------------------------------------
      // Home Page
      //
      // Ex: '/'
      // ---------------------------------------------
      with(/^\/$|^\/\?/) {
        log_page('pages/home.ts', $curr_file)
        @import  'pages/home.ts'
      }



      // ---------------------------------------------
      // Account - Landing Page
      //
      // Ex: '/account/'
      // ---------------------------------------------
      with(/\/account\/$/) {
        log_page('pages/account.ts', $curr_file)
        
        #@import pages/account/login.ts
      }

      // ---------------------------------------------
      //  Account - Login Page
      //
      // Ex: '/account/login?redirecturl=/account/'
      // ---------------------------------------------
      with(/\/account\/login.*/) {
        log_page('pages/account/login.ts', $curr_file)
        
        #@import pages/account/login.ts
      }

      // ---------------------------------------------
      // Account - Register Page 
      //
      // Ex: '/account/register?redirecturl=/account/&url=/account/login.asp'
      // ---------------------------------------------
      with(/\/account\/register.*/) {
        log_page('pages/account/register.ts', $curr_file)
        #@import pages/account/register.ts
      }

      
      // Account - Personal Details
      // Ex: '/account/personaldetails/'
      with(/\/account\/personaldetails/) {
      
      }

      // Account - Shipping Address
      // Ex: '/account/personaldetails/shipping'
      with(/\/account\/personaldetails\/shipping/) {
      
      }

      // Account - Billing Address
      // Ex: '/account/personaldetails/billing'
      // Ex: '/account/personaldetails/billing?edit=1&redirecturl='
      with(/\/account\/personaldetails\/billing/) {
      
      }

      // Account - Order History
      // Ex: '/account/personaldetails/orderhistory'
      with(/\/account\/personaldetails\/orderhistory/) {
      
      }
     
      // Account - Change Password
      // Ex: '/account/personaldetails/password'
      with(/\/account\/personaldetails\/password/) {
      
      } 
      
      // Account - Change Email Address 
      // Ex: '/account/personaldetails/email'
      with(/\/account\/personaldetails\/email/) {
      
      } 
      
      // Account - Newsletter Subscription 
      // Ex: '/account/personaldetails/newsletter'
      with(/\/account\/personaldetails\/newsletter/) {
      
      } 

      // Account - Favourites  
      // Ex: '/account/personaldetails/favourites'
      with(/\/account\/personaldetails\/favourites/) {
      
      } 

      // Customer Services - Landing Page
      // Ex: '/account/customerservices/'
      with(/\/account\/customerservices\/$/) {
      
      }

      // Customer Services - Email Customer Services
      // Ex: '/account/customerservices/feedback'
      // Ex: '/account/customerservices/feedback?findproduct=1'
      with (/\/account\/customerservices\/feedback/) {
      
      }

      // Customer Services - Find a Store
      // Ex: '/account/customerservices/store-locator'
      // Ex: '/account/customerservices/store-locator?linkpos=storelocator'
      with (/\/account\/customerservices\/store\-locator/) {
      
      }

      // Customer Services - Privacy & Cookie Policy
      // Ex: '/account/customerservices/privacy'
      with (/\/account\/customerservices\/privacy/) {
      
      }


      // PDP Pages
      // Ex: '/pages/product_detail.asp?pid=881&prodid=640&cid=54'
      with (/\/pages\/product_detail.asp/) {
        log_page('pages/browse/product.ts', $curr_file)
        @import  'pages/browse/product.ts'
      }

      // Image Category Pages
      // Ex: '/pages/categories.asp?cid=5&linkpos=row2&MCat=1'
      with (/\/pages\/categories.asp.*MCat\=1/) {
        log_page('pages/browse/category_image.ts', $curr_file)
        @import  'pages/browse/category_image.ts'
      }

      // Browse Pages
      // Ex: '/pages/categories.asp?cid=39&linkpos=row2'
      with (/\/pages\/categories.asp/) {
        log_page('pages/browse/browse.ts', $curr_file)
        @import  'pages/browse/browse.ts'
      }

      // Text Category Pages
      // Ex: '/pages/categories.asp'
      // Ex: '/pages/goshopping.asp'
      // Ex: '/pages/goshopping.asp?MCatID=5&MCat=1'
      with (/\/pages\/goshopping.asp/) {
        log_page('pages/browse/category_text.ts', $curr_file)
        @import  'pages/browse/category_text.ts'
      }

      // ---------------------------------------------
      // Page not mapped
      //
      // ---------------------------------------------
      else() {
        log("--> No page match in mappings.ts")
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }

}
