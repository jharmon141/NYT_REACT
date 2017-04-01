// Include React
var React = require("react");

// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {this.props.saved.map((Article, i)=> {
              console.log(Article);
            return (
              <p key={i}>{Article.title} - {Article.date}</p>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
