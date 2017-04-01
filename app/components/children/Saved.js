var React = require("react");

var Saved = React.createClass({

  handleDeleteClick: function(item) {
        this.props.deleteArticle(item);
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body">

        {this.props.savedArticles.map((article, i)=> {
            return (
                <div className="list-group-item" style={{'minHeight': '55px'}}>
                <span style={{'fontSize': '20px'}}>{article.title}</span >
                <span className="btn-group pull-right" >
                <a href={article.url} target="_blank"><button className="btn btn-default ">View Article</button></a>

                <button className="btn btn-danger" onClick={() => this.handleDeleteClick(article)}>Delete</button>
                </span>
                <p>Date Published: {article.date}</p>
                </div>
            );
        })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
