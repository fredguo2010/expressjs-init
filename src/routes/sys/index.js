const sysuserRoute = require('./sysuser.route');
const sysdictionaryRoute = require('./sysdictionary.route');

const sysmenuRoute = require('./sysmenu.route');
const sysorgRoute = require('./sysorg.route');
const sysroleRoute = require('./sysrole.route');
const sysrolemenuRoute = require('./sysrolemenu.route');
const syslogRoute = require('./syslog.route');
const sysloginlogRoute = require('./sysloginlog.route');

const defaultRoutes = [
  {
    path: '/sys/user',
    route: sysuserRoute,
  },
  {
    path: '/sys/sysdictionary',
    route: sysdictionaryRoute,
  },
  {
    path: '/sys/syslog',
    route: syslogRoute,
  },
  {
    path: '/sys/sysmenu',
    route: sysmenuRoute,
  },
  {
    path: '/sys/sysorg',
    route: sysorgRoute,
  },
  {
    path: '/sys/sysrole',
    route: sysroleRoute,
  },
  {
    path: '/sys/sysrolemenu',
    route: sysrolemenuRoute,
  },
  {
    path: '/sys/sysloginlog',
    route: sysloginlogRoute,
  },
];

module.exports = defaultRoutes;
