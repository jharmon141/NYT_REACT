// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

    // Note how we added in this history state variable
    getInitialState: function() {
        return { searchTopic: "", startDate: "", endDate: "", results: [], saved: [], toPostTitle: "", toPostUrl: "", toPostPubDate: "" };
    },

    componentDidMount: function() {
        // Get the saved.
        helpers.getSaved().then( (response) => {
            if (response !== this.state.saved) {
                console.log("Saved Articles", response.data);
                this.setState({ saved: response.data });
            }
        });
    },

    componentDidUpdate: function() {

        // Run the query for the address
        helpers.runQuery(this.state.searchTopic, this.state.startDate, this.state.endDate).then( (data) => {
            if (data !== this.state.results) {
                this.setState({ results: data });
            }
        });
        // After we've done the post... then get the updated saved
        helpers.getSaved().then((response) => {
            this.setState({ saved: response.data });
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

    saveArticle: function(title, url, datePosted) {

        helpers.postSaved(title, url, datePosted)
            .then(() => {
            console.log("Updated!");

        });
        
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

            <Saved saved={this.state.saved} />

            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;
