// Here we will utilize the axios library to perform GET/POST requests
const axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {

  runQuery: function(topic, start, end) {
      console.log(topic, start, end);

     let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=60ef363d30eb4fc79c853a9acb3cc5b6&q=${topic}&begin_date=0101${start}&end_date=0101${end}`;

    return axios.get(queryURL).then(function(response) {

      console.log(response.data.response.docs);
        //update return later
      // return response.docs.results[0].formatted;
        return response.data.response.docs;
    });

  },

  getSaved: function() {
    return axios.get("/api/saved");
  },

  postSaved: function(articleData) {
    return axios.post("/api/saved", articleData);
  },

  deleteSaved: function(articleData) {
    return axios.delete("/api/saved", articleData);
  }

};
