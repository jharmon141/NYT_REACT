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
        return { searchTopic: "", startDate: "", endDate: "", results: [], saved: [],
            toPost: {
                title: "",
                url: ""
            }
        };
    },

    // The moment the page renders get the History
    componentDidMount: function() {
        // Get the latest history.
        helpers.getSaved().then( (response) => {
            console.log(response);
            if (response !== this.state.saved) {
                console.log("Saved Articles", response.data);
                this.setState({ history: response.data });
            }
        });
    },

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function() {

        // Run the query for the address
        helpers.runQuery(this.state.searchTopic, this.state.startDate, this.state.endDate).then( (data) => {
            if (data !== this.state.results) {
                console.log("Results", data);
                this.setState({ results: data });
            }
        });
    },

    saveArticle: function() {

        helpers.postSaved(this.state.toPost).then( () => {
            console.log("Updated!");

            // After we've done the post... then get the updated saved
            helpers.getSaved().then( (response) => {
                console.log("Current History", response.data);
                console.log("History", response.data);
                this.setState({ saved: response.data });
            });
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

    setToPost: function(title, url) {
        let toPostTitle = toPost.title;
        let toPostUrl = toPost.url;
        this.setState({
            title: toPostTitle,
            url: toPostUrl 
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

            <Results results={this.state.results} save={this.setToPost} />

            <Saved saved={this.state.saved} />

            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;
