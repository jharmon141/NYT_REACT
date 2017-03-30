// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { 
        topic: "",
        start: "",
        end: ""
    };
  },

  // This function will respond to the user input
  handleChange: function(event) {
      
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.searchTopic(this.state.topic, this.state.start, this.state.end);
    this.setState({ 
        topic: "",
        start: "",
        end: ""
    });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>

              <h4 className="">
                Topic
              </h4>
              <input
                value={this.state.topic}
                type="text"
                className="form-control text-center"
                id="topic"
                onChange={this.handleChange}
                required
              />

              <h4 className="">
                Start Year (YYYY)
              </h4>
              <input
                value={this.state.start}
                type="text"
                className="form-control text-center"
                id="start"
                onChange={this.handleChange}
                required
              />

              <h4 className="">
                End Year (YYYY)
              </h4>
              <input
                value={this.state.end}
                type="text"
                className="form-control text-center"
                id="end"
                onChange={this.handleChange}
                required
              />

              <br />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>

          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
