var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const model = { 
    title: 'Besucherzähler',
    besucher: 25

  }
  res.render('index', model)
})

module.exports = router
