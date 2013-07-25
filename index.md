# Firefox OS guide

Hop!

## Resources and tools

(Just putting a list here for now. May expand into its own page if it gets too long)

### Mozilla Mortar

Some templates that can be used as starting point:

* [App stub](https://github.com/mozilla/mortar-app-stub) - ultra minimal app template with a manifest and code for installing it.
* [Game stub](https://github.com/mozilla/mortar-game-stub) - game app stub

[Full list](https://github.com/mozilla/mortar) of Mortar repositories.

### Development tools

* [Yeoman generator for Firefox OS](https://github.com/pdi-innovation/generator-firefoxos) - if you find the idea of typing ```yo firefoxos``` quite funny, you'll love this one. Provides a set of command line tools for common tasks such as pushing apps to the device or reading their logs. Here's a [webcast](http://www.youtube.com/watch?v=VOQVuAfCDHc).

### Testing and automation

* [General testing](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Platform/Testing)
* [Marionette](https://developer.mozilla.org/en-US/docs/Marionette) automates things

## Translations, internationalisation and localisation

gettext can be used. It's pretty much like the standard and is very mature and solid but has some shortcomings. i10n and l20n have been created to overcome these shortcomings.

* [gettext](http://en.wikipedia.org/wiki/Gettext). See the code for [High Fidelity](https://github.com/mozilla/high-fidelity) podcasts app for an example of using gettext for translations. Includes a [Makefile](https://github.com/mozilla/high-fidelity/blob/master/Makefile) for processing the translations and converting them into .json files ready for being used in the JS code.
* i10n "internationalisation" - [webL10n](https://github.com/fabi1cazenave/webL10n)
* l20n "localisation" - [L20n](https://wiki.mozilla.org/L20n) and [HTML with L20n](https://wiki.mozilla.org/L20n/HTML)

## "Hacking"

"Advanced topics", for power users and tinkerers.

* [Running Gaia on your computer](chapters/hacking-running-gaia-on-your-computer.md)

## Marketplace and selling

* [Badges](https://assets.mozillalabs.com/Projects/Firefox%20Marketplace/Badges/) for linking to your app in the Marketplace

## Miscellanea: questions without answers (yet)

Either I don't know the answer or haven't had time to write it. Feel free to do it yourself: pull requests are _very_ welcome!

* How to brand Gaia. Make your phone truly yours. Change initial animation, look and feel, ringtones, etc.
* How to flash a custom Gaia build onto a phone.
* Is there an emulator, à la Android QEMU-based emulator?
