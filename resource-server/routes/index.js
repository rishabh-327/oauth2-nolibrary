const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', function(req, res) {
  res.render('index');
});

module.exports = indexRouter;
