// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {
  // Returns a promise object we can .then() off inside our Parent component
  getSaved: function() {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  postSaved: function(articleData) {
    return axios.post("/api/saved", articleData);
  },
  
  deleteSaved: function(articleData) {
    return axios.delete("/api/saved", articleData);
  }
};
