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
        @import pages/home.ts
      }

      // Checkout - Cart Page
      with(/\/pages\/cart\.asp/) {
        log_page('pages/checkout/cart.ts', $curr_file)
        @import pages/checkout/cart.ts
      }

      // Checkout - Review and Pay
      // Ex: /scart/checkout.asp
      with(/^\/scart\/checkout\.asp/) {
        log_page('pages/checkout/checkout.ts', $curr_file)
        @import pages/checkout/checkout.ts
      }      
      // ---------------------------------------------
      //  Account - Login Page
      //
      // Ex: '/account/login?redirecturl=/account/'
      // ---------------------------------------------
      with(/\/account\/login.*/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/login.ts', $curr_file)
        @import pages/account/login.ts
      }

      // ---------------------------------------------
      // Account - Register Page 
      //
      // Ex: '/account/register?redirecturl=/account/&url=/account/login.asp'
      // ---------------------------------------------
      with(/\/account\/register.*/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/register.ts', $curr_file)
        #@import pages/account/register.ts
      }

      
      // Account - Personal Details
      // Ex: '/account/personaldetails/'
      with(/\/account\/personaldetails/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Account - Shipping Address
      // Ex: '/account/personaldetails/shipping'
      with(/\/account\/personaldetails\/shipping/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Account - Billing Address
      // Ex: '/account/personaldetails/billing'
      // Ex: '/account/personaldetails/billing?edit=1&redirecturl='
      with(/\/account\/personaldetails\/billing/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Account - Order History
      // Ex: '/account/personaldetails/orderhistory'
      with(/\/account\/personaldetails\/orderhistory/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }
     
      // Account - Change Password
      // Ex: '/account/personaldetails/password'
      with(/\/account\/personaldetails\/password/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 
      
      // Account - Change Email Address 
      // Ex: '/account/personaldetails/email'
      with(/\/account\/personaldetails\/email/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 
      
      // Account - Newsletter Subscription 
      // Ex: '/account/personaldetails/newsletter'
      with(/\/account\/personaldetails\/newsletter/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 

      // Account - Favourites  
      // Ex: '/account/personaldetails/favourites'
      with(/\/account\/personaldetails\/favourites/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 

      // Customer Services - Landing Page
      // Ex: '/account/customerservices/'
      with(/\/account\/customerservices\/$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts

        log_page('pages/account/customer_service/landing.ts', $curr_file)
        @import pages/account/customer_service/landing.ts
      }

      // Customer Services - Email Customer Services
      // Ex: '/account/customerservices/feedback'
      // Ex: '/account/customerservices/feedback?findproduct=1'
      with (/\/account\/customerservices\/feedback/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - Find a Store
      // Ex: '/account/customerservices/store-locator'
      // Ex: '/account/customerservices/store-locator?linkpos=storelocator'
      with (/\/account\/customerservices\/store\-locator/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/customer_service/store_locator.ts', $curr_file)
        @import pages/account/customer_service/store_locator.ts
      }

      // Customer Services - All Stores
      // Ex: '/account/customerservices/all-stores'
      with (/\/account\/customerservices\/all\-stores$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - All Stores(Individual Store)
      // Ex: '/account/customerservices/all-stores/Isle-of-Man'
      with (/\/account\/customerservices\/all\-stores\/\w/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - Privacy & Cookie Policy
      // Ex: '/account/customerservices/privacy'
      with (/\/account\/customerservices\/privacy/) {
      
      }

      // ---------------------------------------------
      // Account - Landing Page
      //
      // Ex: '/account/'
      // ---------------------------------------------
      with(/\/account\/$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        //log_page('pages/account.ts', $curr_file)
      }

      // PDP Pages
      // Ex: '/pages/product_detail.asp?pid=881&prodid=640&cid=54'
      with (/\/pages\/product_detail.asp/) {
        log_page('pages/browse/product.ts', $curr_file)
        @import  'pages/browse/product.ts'
      }

      // Image Category Pages
      // Ex: '/pages/categories.asp?cid=5&linkpos=row2&MCat=1'
      with (/\/pages\/categories.asp.*((MCat|rdcnt)\=1|cid=(316|5$))/) {
        log_page('pages/browse/category_image.ts', $curr_file)
        @import  'pages/browse/category_image.ts'
      }

      // Browse Pages
      // Ex: '/pages/categories.asp?cid=39&linkpos=row2'
      with (/\/pages\/(categories|product).asp/) {
        log_page('pages/browse/browse.ts', $curr_file)
        @import  'pages/browse/browse.ts'
      }

      // Text Category Pages
      // Ex: '/pages/goshopping.asp'
      // Ex: '/pages/goshopping.asp?MCatID=5&MCat=1'
      with (/\/pages\/goshopping.asp/) {
        log_page('pages/browse/category_text.ts', $curr_file)
        @import  'pages/browse/category_text.ts'
      }

      // Search - No Matches
      // Ex: '/pages/iq.asp?SearchText=vinp'
      with (/iq\.asp\?SearchText/) {
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
