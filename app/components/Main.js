// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var axios = require('axios');

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

    // Note how we added in this history state variable
    getInitialState: function() {
        return { searchTopic: "", startDate: "", endDate: "", results: [], saved: [] };
    },

    componentDidMount: function() {
        this.getSavedArticles();
    },

    componentDidUpdate: function() {

        // Run the query for the address
        helpers.runQuery(this.state.searchTopic, this.state.startDate, this.state.endDate).then( (data) => {
            if (data !== this.state.results) {
                this.setState({ results: data });
            }
        });
    },


    // This function allows childrens to update the parent.
    setSearch: function(topic, start, end) {
        this.setState({ 
            searchTopic: topic, 
            startDate: start,
            endDate: end
        });
    },

    saveArticle: function(title, url, date) {
        helpers.postSaved(title, url, date)
        this.getSavedArticles();
    },

    getSavedArticles: function(){
        axios.get('/api/saved')
        .then((response) => {
            this.setState({
                saved: response.data
            });
        });
    },

    deleteArticle: function(article) {
        helpers.deleteSaved(article);
        this.getSavedArticles();
    },

    // Here we render the function
    render: function() {
        return (
            <div className="container">
            <div className="row">
            <div className="jumbotron">
            <h2 className="text-center">New York Times Article Scrubber</h2>
            <h4 className="text-center">Search for and save articles of interest</h4>
            </div>
            </div>

            <Form searchTopic={this.setSearch} />

            <Results results={this.state.results} saveArticle={this.saveArticle} />

            <Saved savedArticles={this.state.saved} deleteArticle={this.deleteArticle}/>

            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;
