// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  save: function() {
      let newSaved = {};
      newSaved = {
          title: event.target.headline.main,
          url: event.target.web_url
      }
  },

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">

          {this.props.results.map(function(article, i) {
              if (i < 5) {
            return (
                <div className="panel panel-default">
                <div className="panel-body">
              <a href={article.web_url}><h5 key={i}>{article.headline.main}</h5></a>
              <button
                className="btn btn-primary"
                onClick={this.props.save}
              >
                Save
              </button>
                </div>
                </div>
            );
              }
              return
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
