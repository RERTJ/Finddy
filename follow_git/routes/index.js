module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/signin');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));

  app.use('/users', require('./users'));
  app.use('/activity', require('./activity'));
  app.use('/profile', require('./profile'));
  app.use('/search', require('./search'));
  app.use('/searchResult', require('./searchResult'));
};
