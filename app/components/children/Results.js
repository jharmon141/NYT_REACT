// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

    handleSaveClick: function(item){

        this.props.saveArticle(item.headline.main, item.web_url, item.pub_date);
        
    },

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">

          {this.props.results.map((article, i)=> {
              if (i < 5) {
            return (
                <div className="list-group-item" style={{'minHeight': '55px'}}>
              <span style={{'fontSize': '20px'}}>{article.headline.main}</span >
 <span className="btn-group pull-right" >
                  <a href={article.web_url} target="_blank"><button className="btn btn-default ">View Article</button></a>

                  <button className="btn btn-primary" onClick={() => this.handleSaveClick(article)}>Save</button>
                </span>
                <p>Date Published: {article.pub_date}</p>
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
