var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const model = { 
    title: 'NWT Besucherzähler',
    besucher: 25,
    momentan: 4,
    ausgetreten: 21

  }
  res.render('index', model)
})

module.exports = router
