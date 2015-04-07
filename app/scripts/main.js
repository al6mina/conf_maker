'use strict';

if (!global.Intl) {
  require('intl');
}
var React = require('react');
var BasicLayout = require('./modules/BasicLayout');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var intlData = {
  'locales': 'en-US'
};

// var App = React.createClass({
//   mixins: [IntlMixin],
//   render: function() {
//     return (
//         <BasicLayout />
//     )
//   }
// });

module.exports.App = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
        <BasicLayout />
    )
  }
});

// React.render(<App /*{...intlData}*//>, document.getElementById('app'));

// // NOTE : temporary solution : add livereload script on development
// if (window.CM_DATA.env === 'development') {
//   var liveReload = document.createElement('script');
//   liveReload.src = '//localhost:9091';
//   document.body.appendChild(liveReload)
// }

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
