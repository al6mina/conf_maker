'use strict';

if (!global.Intl) {
  require('intl');
}
var React = require('react');
var BasicLayout = require('./modules/BasicLayout');
var ReactIntl = require('react-intl');
var config = require('./config');
var utilities = require('./utilities');
var IntlMixin = ReactIntl.IntlMixin;

var intlData = {
  'locales': 'en-US'
};

var data = {
  location: utilities.ajax('get', config.pathJSON('location'), function(data) { return JSON.parse(data);}),
  speakers: utilities.ajax('get', config.pathJSON('speakers'), function(data) { return JSON.parse(data);}),
  partners: utilities.ajax('get', config.pathJSON('partners'), function(data) { return JSON.parse(data);}),
  schedule: utilities.ajax('get', config.pathJSON('schedule'), function(data) { return JSON.parse(data);}),
  registration: utilities.ajax('get', config.pathJSON('registration'), function(data) { return JSON.parse(data);}),
  overview: utilities.ajax('get', config.pathJSON('mainInfo'), function(data) { return JSON.parse(data);}),
  footer: utilities.ajax('get', config.pathJSON('footer'), function(data) { return JSON.parse(data);})
}

var App = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
        <BasicLayout data={data}/>
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

//fix menu when scrolling os make static due to window.pageYOffset
window.onscroll = function() {
  var menu = document.getElementById('menu');
  var header = document.getElementById('header');
  var overview = document.querySelector('#menu + section');
  var pageScroll = window.pageYOffset;
  var menuStyle = menu.style;
  var manuHeight = menu.offsetHeight;
  var headerHeight = header.offsetHeight;

  if (pageScroll >= headerHeight) {
    menuStyle.position = 'fixed';
    menuStyle.width = '100%';
    menuStyle.top = '0';
    menuStyle.left = '0';
    overview.style.paddingTop = menu.offsetHeight + 'px';
  } else {
    menuStyle.position = 'relative';
    overview.style.paddingTop = '0px';
  }
};
