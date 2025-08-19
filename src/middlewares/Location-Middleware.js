const geoip = require('geoip-lite2');

const Nearby = async (req, res, next) => {
  let userLat = req.query.lat || req.body.lat;
  let userLng = req.query.lng || req.body.lng;

  if (userLat && userLng) {
    req.userLocation = {
      lat: parseFloat(userLat),
      lng: parseFloat(userLng),
    };
    return next();
  }

  const userIp =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log("User IP:", userIp);

  const geo = geoip.lookup(userIp);

  if (geo) {
    req.userLocation = {
      lat: geo.ll[0], // latitude
      lng: geo.ll[1], // longitude
    };
  } else {
    // Default (Pune)
    req.userLocation = {
        lat: 18.5204,
        lng: 73.8567,
    };
  }

  next();
}

module.exports = {
  Nearby
}
