# The main file executed by Tritium. The start of all other files!

match($content_type) {
  with(/html/) {
    replace(/fb:/, "fbn_") # Rewrite the xmlns facebook nodes before the html parser clobbers them
    
    html("UTF-8") {
      @import device_detection.ts

      # This file is meant to be used while the site is being built 
      # and the project might be in the production environment. This will help to 
      # ensure that the project can live on a prod environment, but not
      # be world accessible.
      
      # Coming Soon...
      # Comment out the line below once you begin working
      # @import coming_soon.ts

      @import html.ts
    }

    replace(/fbn_/, "fb:") # Rewrite the xmlns facebook nodes to restore them
  }
  #with(/javascript/) {
  #  @import ajax.ts
  #}
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}