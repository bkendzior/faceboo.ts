## faceboo.ts
This is faceboo.ts - a FacebookSDK javascript wrapper for tritium

## Access 
This project can be run from faceboots.hazasite.com - Ideally on a mobile
device or simulator

## Demo Features 
Header of every page - Login/Logout w/ user name and photo

Store Locator * Enable / grant geolocation permissions
              * Find locations near you
              * Check in to location near you
              * Debug check-in button (manually enter location ID from
                inspector)

Product page  * Like button
              * Comment using Opengraph
              * send message to friends
              * Publish story on newsfeed
              * Query and return 25 friends and images

From facebook - after permissions are granted, app appears in sidebar

## Facebook Accounts
Either use your personal facebook account, or the test one below:

email: brian.kendzior@moovweb.com
password: moovweb

## Function Definitions
Function definitions and descriptions are in /functions/main.ts starting on
line 318

## Creating a facebook app
Note that any site hosted on moovapp.com will not work with Opengraph as
facebook's crawlers will only be able to see the spash screen

Below is the setup for the current app:
![screenshot](https://raw.github.com/bkendzior/faceboo.ts/master/fb_setup.jpg)

## Future Development
Additional features:
* More Opengraph Access
* payment w/ ecoins
* figure out channel file hosting
* style non-native popups to preserve viewport
* fix browser style refresh issues w/ apple webkit
* mini-feed posts
* inject meaningful data into opengraph meta tags
