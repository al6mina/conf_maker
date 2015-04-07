'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Speakers = require('./Speakers.jsx');
var Partners = require('./Partners.js');
var Schedule = require('./Schedule.jsx');
var Registration = require('./Registration.jsx');
var Overview = require('./Overview.jsx');
var Footer = require('./Footer.jsx');
var config = require('../config');
var utilities = require('../utilities');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var LayoutBasic = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    var confModules = [];

    config.modules.map(function(item) {
      if (item.isRendering) {
        confModules.splice(item.order, 0, item.title);
      }
    });

    var moduleList = {
      location: <LocationMap key="LocationMap" inf={this.props.location} />,
      speakers: <Speakers key="Speakers" inf={this.props.speakers} />,
      partners: <Partners key="Partners" inf={this.props.partners} />,
      schedule: <Schedule key="Schedule" inf={this.props.schedule} />,
      registration: <Registration key="Registration" inf={this.props.registration} />,
      overview: <Overview key="Overview" inf={this.props.overview} />
    };

    var modulesToRender = confModules.map(function(item) {
      return moduleList[item];
    });

    return (
      <div className="page-wrap">
        <Header />
        <Menu items={confModules}/>

        {modulesToRender}

        <Footer inf={this.props.footer} />
      </div>
    );
  }
});

module.exports = LayoutBasic;
