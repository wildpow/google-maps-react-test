# Description
I'm using this repo to teach myself the Google Maps API using the NPM package [google-maps-react](https://github.com/fullstackreact/google-maps-react).	

## Features
 * Search for places and zoom to them on map.
 * Add markers to map and save them.
 * Remove markers from map.
 * Draw lines between markers.
 * Display info window on active markers.
## Quick start
  1. Terminal commands to install.

  ```shell
  git clone https://github.com/wildpow/google-maps-react-test.git
  cd google-maps-react-test
  yarn
  ```
---
  2. Add your API key at the bottom of `MyMap.js`

  ```javascript
  export default GoogleApiWrapper({
  apiKey: ('!API KEY GOES HERE!')
  })(MapWrapper)
  ```
---
  3. Run example.

  ```shell
  yarn start
  ```
