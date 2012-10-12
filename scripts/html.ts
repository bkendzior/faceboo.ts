# HTML Transformations go here

$("/html") {

  
  rewrite_links()
  absolutize_srcs()

  ga_mobile_id("UA-18779593-8")

  # Needed to begin mobilizing
  remove_all_styles()
  remove_html_comments()
  insert_mobile_meta_tags()
  
  # SEO
  add_mobile_seo()

  add_assets()

  remove_clearer() // Removes clearer div

  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts

  # Include mw_analytics file to track the mobile site
  @import mw_analytics.ts
  
  # Remove all script tags not marked with "data-keep" attribute
  @import keep_desktop_js.ts

  remove_desktop_js()
  remove_doubleclick_iframe()
  
  # Late load all the images on the site
  lateload()
}
