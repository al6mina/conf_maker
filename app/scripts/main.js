'use strict';


if (!global.Intl) {
  require('intl');
}
var React = require('react');
var BasicLayout = require('./modules/BasicLayout');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

require('../styles/styles.scss');

var intlData = {
  'locales': 'en-US'
};

var App = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
        <BasicLayout />
    )
  }
});

React.render(<App /*{...intlData}*//>, document.getElementById('app'));

// NOTE : temporary solution : add livereload script on development
if (window.CM_DATA.env === 'development') {
  var liveReload = document.createElement('script');
  liveReload.src = '//localhost:9091';
  document.body.appendChild(liveReload)
}

var menu = require('./modules/menu.js');
var locationMap = require('./modules/locationMap.js');
var registration = require('./modules/registration.js');
var schedule = require('./modules/schedule.js');
var speakers = require('./modules/speakers.js');

//TODO: somehow disable locatinMap for mobiles
menu();
locationMap('View on Google Maps');
registration();
schedule();
speakers('See all speakers');
