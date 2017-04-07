module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  //app.use('/activity', require('./activity'));
  app.use('/users', require('./users'));
  //app.use('/search',require('./search'));
};
