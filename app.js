'use strict'

var express = require('express')
var path = require('path')
var app = express() // creates express http server

var indexRouter = require('./routes/index')
var botWebhook = require('./routes/bot-webhook')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRouter)
app.use('/webhook', botWebhook)


// Sets server port and logs message on success
app.listen(process.env.PORT || 1337,
	() => console.log('webhook is listening at ', process.env.PORT ? process.env.PORT : 1337))