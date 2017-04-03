// Here we will utilize the axios library to perform GET/POST requests
const axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
const helper = {

  runQuery: function(topic, start, end) {

     let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=60ef363d30eb4fc79c853a9acb3cc5b6&q=${topic}&begin_date=${start}0101&end_date=${end}0101`;

    return axios.get(queryURL).then(function(response) {

        return response.data.response.docs;
    });

  },

  postSaved: function(title, url, date) {
      return axios.post("/api/saved" , {
          title: title,
          url: url, 
          date: date
      });
  },

  deleteSaved: function(article) {
        axios.delete('/api/saved/' + article._id)
            .then((response) => {
                this.setState({
                    saved: response.data
                });
                return response;
            });
  }

};

module.exports = helper;
