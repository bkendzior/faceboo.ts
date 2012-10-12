## Basics
This project works with the MoovwebSDK
See detailed Manhattan docs at http://beta.moovweb.com

## Domains
  127.0.0.1 	mlocal.hollandandbarrett.com
  127.0.0.1 	mlocal.www.hollandandbarrett.com

## Deploy
Run the below commands once to add the remotes.
  git remote add moovstage moov@git.moovweb.com:hollandandbarrett/stage.git
  git remote add moovprod moov@git.moovweb.com:hollandandbarrett/prod.git

To push to these repos, use the following commands
  $ git tag 
  $ git tag -a 0.1.1 -m "version 0.1.1, the next one is 0.1.2, got tickets and other items are all working" 
  $ git push origin master --tags 
  $ git checkout tag-number 
  $ git push moovstage

  Stage: git push moovstage
	Prod: git push moovprod 

## Accounts
email: brian.kendzior@moovweb.com
password: m00vw3b

## Test Credit Cards
Name: DO NOT SHIP, DO NOT SHIP
Email: your moovweb e-mail address (to track order cancellation) 
Address: DO NOT SHIP
Post Code: CV10 7RH

Visa CC#: 4444444444444448 (15 4's followed by an 8)
Expiration: -anything-
CVV: 123

Visa CC#: 4444333322221111
Expiration: 12/14
CVV: 123

## Importing tritium files
Pair @import statements with a cooresponding call to:
log_page("Path_to_ts_file_here", "file_name_of_current_ts_file")

This keeps the logging more organized and standard. In many files, the $curr_file
variable is added to make multiple calls to log_page easier. EX:

$curr_file = 'mappings.ts'

log_page('pages/checkout/basket.ts', $curr_file)
@import pages/checkout/basket.ts

The corresponding log statement will look like this:

"--> Importing pages/checkout/basket.ts in mappings.ts"

//
asdfj
