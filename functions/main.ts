$curr_file = "functions/main.ts"

####################
### Site Functions
####################

@func XMLNode.ga_mobile_id(Text %new_id) {
  $("/html//script[contains(text(),'UA-')]") {
    text() {
      replace(/UA\-\d*\-\d/,%new_id)
    }
  }
}

// Removes the doubleclick script 
// Doesn't run on account_base or more_base pages - doubleclick not there
@func XMLNode.remove_doubleclick_iframe() {
  // Sometimes a script writes the iFrame to the page
  $("/html/body[not(contains(@class,'_base'))]//script[contains(text(),'doubleclick.net')]") {
    remove()
  }
  // Other times the iFrame is already on the page
  $("/html/body[not(contains(@class,'_base'))]//iframe[contains(@src,'doubleclick.net')]") {
    remove()
  }
}

// Removes 'clearer' divs from the page
@func XMLNode.remove_clearer() {
  $("/html//div[@class='clearer']") {
    remove()
  }
}

# LOG PAGE
# 
#  logs the page name, and sets the $page_name variable for future use
#  
#   INPUT: 
#     %page_name - page name that is being imported
#     %curr_file - file that is calling log_page
#
#   OUTPUT:
#     1. sets the $page_name global variable
#     2. logs a useful tritium message
#     3. ?? Imports $page_name file (Not supported yet)

@func XMLNode.log_page(Text %page_name, Text %curr_file) {
  $page_name = %page_name

  log("--> Importing " + $page_name + " in " + $curr_file)

  // Some day, this will work, and it will be awesome
  //@import concat("../scripts/",$page_name) 
}



# BTN DELEGATE
# 
# EXAMPLE CSS
# .mw_hide2 {
#   visibility: hidden!important;
#   position: absolute!important;
#   left: -99999px!important;
# }

#  EXAMPLE TS
#
#  $(".//input[@type='submit']") {
#    attributes(id: "mw_id", alt: "mw_alt")
#
#    btn_delegate() {
#      add_class("mw_btn_500000000050")
#      // in a pinch you can do other scoping in here
#    }
#  }

@func XMLNode.btn_delegate() {
  %class = fetch("./@class")
  %mw_id = concat("mw_", name(), "_", fetch("./@id"))
  %text = fetch("./@alt")

  %text {
    replace(/_/, " ")
  }

  insert_before("div", %text, class: %class) {
    attributes(onclick: concat("var event=arguments[0]||window.event;event.preventDefault;event.stopPropagation;x$('[data-mw-btn-id=\"", %mw_id, "\"]').click()"))

    yield()
  }

  attributes(data-mw-btn-id: %mw_id)
  add_class("mw_hide2")
}


# A compendium of ways to "dump" tables
#
#
# EXAMPLE::
# 
# table_dump(".//table") {
#   $("./div[class='some_class']") {
#     add_class("mw_more_scopes")
#   }
# }
#
#
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw_was_table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw_dump_", %n, %i), width: "")
      add_class(concat("mw_was_", %n))
    }

    yield()
  }
}



# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet']")
  remove(".//link[@rel='Stylesheet']")
  remove(".//link[@type='text/css']")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove_external_styles()
  remove_internal_styles()
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_internal_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-keep) or @data-keep='false')]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Clean Meta Tags
@func XMLNode.insert_mobile_meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")

  # Add our meta tags
  $("/html/head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
    insert("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    # The images below are placeholders, get real ones from the client
    # Change to -precomposed to not have the glass effect on the icons
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-57x57.png"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-114x114.png"))
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("./head") {
    # Add AJAX rewrite config to rewrite items via JS (need passthrough_ajax.js)
    insert("meta") {
      attribute("id", "mw_link_passthrough_config")
      attribute("rewrite_link_matcher", $rewrite_link_matcher)
      attribute("rewrite_link_replacement", $rewrite_link_replacement)
    }
  }
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    $("/html/head/base[@href]") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
      $rewriter_url = fetch("./@href")
    }
    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
  }
}

# Absolutize Items 
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
  }
}

# This function lateloads all images and moves scripts to the bottom of the body, place function at end of html.ts
@func XMLNode.lateload() {
  $(".//script[not(contains(@src,'main.js' ))]") {
    #move_to("//html/body", "bottom")
  }
  $(".//img") {
    attribute("src") {
      #name("data-ur-ll-src")
    }
  }
}

# Add mobile SEO requirements
@func XMLNode.add_mobile_seo() {
  # Inject a canonical link as long as there isn't already one. 
  %canonical_found = "false"
  $(".//link[@rel='canonical']") {
    %canonical_found {
      replace(/.*/, "true")
    }
  }
  match(%canonical_found) {
    with(/false/i) {
      %link = "://" + $source_host + $path
      match($secure) {
        with(/true/i) {
          %link {
            prepend("s")
          }
        }
      }
      %link {
        prepend("http")
      }
      $("/html/head") {
        insert("link", rel: "canonical", href: %link)
      }
    }
  }
} 

//   _____                   ___.                         __          
// _/ ____\____    ____  ____\_ |__   ____   ____       _/  |_  ______
// \   __\\__  \ _/ ___\/ __ \| __ \ /  _ \ /  _ \      \   __\/  ___/
//  |  |   / __ \\  \__\  ___/| \_\ (  <_> |  <_> )      |  |  \___ \ 
//  |__|  (____  /\___  >___  >___  /\____/ \____/   /\  |__| /____  >
//             \/     \/    \/    \/                 \/            \/ 

// Set default values
@func XMLNode.faceboots_init() {
  $faceboots_channelUrl = "//'+window.location.hostname+'/channel"
  $faceboots_appId = ''
  $faceboots_appSecret = ''
  $faceboots_appNamespace = ''
  $faceboots_permissions = ''
}

// ------------------------
// Setters
// ------------------------

// Facebook appId
@func XMLNode.faceboots_set_appID(Text %id) {
  $faceboots_appId = %id 
}

// URL to your channel file (helps prevent cross-domain errors
// see: https://developers.facebook.com/blog/post/530/
@func XMLNode.faceboots_set_channelUrl(Text %url) {
  $faceboots_channelUrl = %url
}

// Facebook app namespace
@func XMLNode.faceboots_set_appNamespace(Text %namespace) {
  $faceboots_appNamespace = %namespace 
}
  
// Facebook app secret
@func XMLNode.faceboots_set_appSecret(Text %secret) {
  $faceboots_appSecret = %secret 
}

// Facebook permissions to ask for on login
// see: https://developers.facebook.com/docs/authentication/permissions/
@func XMLNode.faceboots_set_permissions(Text %permissions) {
  $faceboots_permissions = %permissions
}

// ------------------------
// Attach Listeners
// ------------------------

@func XMLNode.faceboots_add_login_listener() {
  attributes(onclick:"FB.login(function(response) { }, {scope:\'"+$faceboots_permissions+"\'})")
}

@func XMLNode.faceboots_add_logout_listener() {
  attributes(onclick:'FB.logout()')
}

// ------------------------
// Add Elements
// ------------------------

@func XMLNode.faceboots_add_like() {
  insert("fb:like", show_faces:"true")
}

// Adds a send to friends button as well as a like button
@func XMLNode.faceboots_add_like_with_send() {
  insert("fb:like", send:"true", width:"100%", show_faces:"true")
}

// Opengraph meta tags for use with like button and shares + more
@func XMLNode.faceboots_opengraph_meta_tags(Text %type, Text %title, Text %image, Text %url) {
  $("/html/head") {
    attribute("prefix","og: http://ogp.me/ns# " + "fb: http://ogp.me/ns/fb# " + $faceboots_appNamespace +":"+" http://ogp.me/ns/apps/"+$faceboots_appNamespace+"#")
    attribute("xmlns", "http://www.w3.org/1993/xhtml")

    // This hides the bottom nav bar while in the facebook native app_id
    insert("meta", name:"apple-mobile-web-app-capable", content: "yes")

    insert("meta", property:"fb:app_id", content: $faceboots_appId )												// Your APP Id 
    insert("meta", property:"og:type", content: %type )																		// Action type
    insert("meta", property:"og:title", content: %title )																	// Title of object as it should appear in the graph 
    insert("meta", property:"og:image", content: %image )																	// URL to an image 
    insert("meta", property:"og:url", content: %url )																			// URL of this object
  }
}

// ------------------------
// Inject Inline JS
// ------------------------

// XMLNode.faceboots_load_sdk()
// --------------------------------------------
// Injects javascript that asynchronously loads the facebook api (all.js)
//
// ** All faceboots functions depend on the API load
@func XMLNode.faceboots_load_sdk() {
  insert_javascript(read('../assets/javascript/faceboots/load_sdk.js')) {
    text() {
      replace(/YOUR\_APP\_ID/,$faceboots_appId)
      replace(/YOUR\_CHANNEL\_URL/,$faceboots_channelUrl)
    }
  }
}

// XMLNode.faceboots_inject_get_friends(Text %friends_container)
// --------------------------------------------
// Injects javascript for the getUserFriends() function which will fetch 25 friends and
// inject their profile image and name into an element with @id = %friends_container
@func XMLNode.faceboots_inject_get_friends(Text %friends_container) {
  insert_javascript(read('../assets/javascript/faceboots/get_friends.js')) {
    text() {
      replace(/YOUR_FRIENDS_CONTAINER/,%friends_container)
    }
  }
}

// XMLNode.faceboots_inject_check_in(Text %checkin_container)
// --------------------------------------------
// Injects js that defines the getCheckIns() funtion which fetches the logged in user's
// previous checkins into element @id=%checkin_container, as well as the checkin(id) 
// function which checks you into a location with place# = id
//
// ** Requires checkin permissions via faceboots_inject_prompt_checkin() 
@func XMLNode.faceboots_inject_check_in(Text %checkin_container) {
  insert_javascript(read('../assets/javascript/faceboots/check_in.js')) {
    text() {
      replace(/CHECKIN_CONTAINER/,%checkin_container)
    }
  }
}

// XMLNode.faceboots_inject_get_nearby(Text %nearby_container) 
// --------------------------------------------
// Inject js to define getNearby which fetches the nearby locations and injects them into
// element @id=%nearby_container
//
// ** Requires checkin permissions via faceboots_inject_prompt_checkin() 
@func XMLNode.faceboots_inject_get_nearby(Text %nearby_container) {
  insert_javascript(read('../assets/javascript/faceboots/get_nearby.js')) {
    text() {
      replace(/NEARBY_CONTAINER/,%nearby_container)
    }
  }
}

// XMLNode.faceboots_inject_send_request(Text %message)
// --------------------------------------------
// Injects js to define sendRequest() which allows you to send links
// Message can be up to 60 characters
@func XMLNode.faceboots_inject_send_request(Text %message) {
  insert_javascript(read('../assets/javascript/faceboots/send_request.js')) {
    text() {
      replace(/MESSAGE/,%message)
    }
  }
}

// XMLNode.faceboots_inject_prompt_checkin() 
// --------------------------------------------
// Injects js that defines promptCheckInPermission() which will prompt a logged in user for permissions
// to access checkin data
@func XMLNode.faceboots_inject_prompt_checkin() {
  insert_javascript(read('../assets/javascript/faceboots/prompt_checkin.js'))
}

// XMLNode.faceboots_inject_publish_story(Text %name, Text %caption, Text %description, Text %link, Text %picture)
// --------------------------------------------
// Injects js that will allow a user to post a story on his/her timeline using publishStory()
@func XMLNode.faceboots_inject_publish_story(Text %name, Text %caption, Text %description, Text %link, Text %picture) {
  insert_javascript(read('../assets/javascript/faceboots/publish_story.js')) {
    text() {
      replace(/STORY_NAME/,%name)
      replace(/STORY_CAPTION/,%caption)
      replace(/STORY_DESCRIPTION/,%description)
      replace(/STORY_LINK/,%link)
      replace(/STORY_PICTURE_URL/,%picture)
    }
  }
}

// XMLNode.faceboots_inject_get_user_info(Text %user_info)
// --------------------------------------------
// Injects JS that will automatically inject a user's picture and name into element @id=%user_info on successful FB.init
@func XMLNode.faceboots_inject_get_user_info(Text %user_info) {
  insert_javascript(read('../assets/javascript/faceboots/update_user_info.js')) {
    text() {
      replace(/USER_INFO/,%user_info)
    }
  }

  // Add call to update user info inside HandleStatusChange
  $("/html//script[contains(text(),'//UPDATE_USER_INFO')]") {
    text() {
      replace(/\/\/UPDATE_USER_INFO/,"updateUserInfo(response);")
    }
  }
}
