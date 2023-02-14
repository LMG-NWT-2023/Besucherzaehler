var express = require('express')
var router = express.Router()
var besucherZaehler = undefined

var defaultModel = {
  besucher: 4,
  momentan: 7, 
  ausgetreten: 3
}
/* GET home page. */
router.get('/', function(req, res, next) {
  const model = besucherZaehler ? besucherZaehler.aktuellerStand() : defaultModel
  res.render('index', model)
})

module.exports = router
