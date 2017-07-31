# TRAINSTRIKE!

This may or may not be a serious undertaking.

Currently live at https://trainstrike.co.uk

Simple campaign landing page uses firebase to store submissions and provide real time comment stream to page.

Html should be fast, mobile first design.

## To build
  1. clone this repo
  2. run `npm i` in the root of this project.
  3. run `npm run build`
  4. folder public should now hold static site

## To deploy
  1. Set up a new project on firebase, copy your public API key into the file `main.js`.
  2. Push public folder to static file server. (we have used firebase hosting service)
  3. Deploy the functions and database rules to firebase.

##### Made with :heart: by @des-des and @lukem512
##### Contributions welcome :sparkles:
