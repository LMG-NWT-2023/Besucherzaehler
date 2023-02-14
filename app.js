var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var {BesucherZaehler} = require('./BesucherZaehler')

// Instanz des Besucherzählers erzeugen und an den Router weitergeben
var besucherZaehler = new BesucherZaehler()
indexRouter.setBesucherZaehler(besucherZaehler)

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/socket.io/', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter.router)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// WebSockets
var io
app.setBesucherZaehlerIO = (socketIO) => {
  if (socketIO === undefined) {
    console.log('noch kein SocketIO verfügbar')
    return
  }

  io = socketIO
  io.on('connection', () => { 
    console.log("WebSocket connection!")
    besucherZaehler.sendeAktuellenStand()
   });  

   if (besucherZaehler) {
    console.log('Besucherzäher ist schon instanziiert und bekommt die socketIO-Instanz')
    besucherZaehler.setSocketIO(io)
   }
}

module.exports = app
