const { Navigator } = require("node-navigator");
const navigator = new Navigator();

navigator.geolocation.getCurrentPosition((success, error) => {
  if (error) console.log(error);
  else console.log(success);
});
