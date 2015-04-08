'use strict';

var React = require('react');
var BasicLayout = require('./modules/BasicLayout');

module.exports.App = React.createClass({
  render: function() {
    return (
        <BasicLayout data={this.props}/>
    );
  }
});
