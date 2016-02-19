'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  app.use('/api/auth', require('./api/auth'));
  app.use('/api/rewards', require('./api/reward'));
  app.use('/api/users', require('./api/user'));
  
  app.use('/', showIndex);
  function showIndex(req, res) {
    res.render('index');
  }

  // All undefined api routes should return a 404
  app.route('/:url(api|auth|components)/*')
   .get(errors[404]);
};