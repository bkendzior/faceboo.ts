// 1. Match a specific page to keep the JS on
// 2. Add data-keep='true' to keep a specific js file

match($page_name) {

  // Home
  with(/pages\/home\.ts/) {
  
  }
}

// Global keep
// ----------------
// Uncomment to keep all site scripts
$("/html//script") {
  #attribute("data-keep","true")
}
