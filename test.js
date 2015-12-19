var GoogleMapsAPI = require('googlemaps');

var publicConfig = {
  key: 'AIzaSyCZVrpwoAbKCzpjtspToqCHbUICoOq9ybs',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false
};
var gmAPI = new GoogleMapsAPI(publicConfig);

// geocode API
var geocodeParams = {
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};

gmAPI.geocode(geocodeParams, function(err, result){
  console.log(result);
});
