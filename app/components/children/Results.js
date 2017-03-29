// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.results.map(function(article, i) {
              if (i < 5) {
            return (
                <div className="panel panel-default">
                <div className="panel-body">
              <a href={article.web_url}><h5 key={i}>{article.headline.main}</h5></a>
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
