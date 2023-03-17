var express = require('express')
var router = express.Router()
var besucherZaehler = undefined

var defaultModel = {
  besucher: 7,
  momentan: 4, 
  ausgetreten: 3,
  heute: "1.03.2023"
}
/* GET home page. */
router.get('/', function(req, res, next) {
  const model = besucherZaehler ? besucherZaehler.aktuellerStand() : defaultModel
  res.render('index', model)
})

function setBesucherZaehler(neuerBesucherZaehler) {
  besucherZaehler = neuerBesucherZaehler
}

module.exports.router = router
module.exports.setBesucherZaehler = setBesucherZaehler