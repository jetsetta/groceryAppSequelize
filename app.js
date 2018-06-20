const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const models = require('./models')

let shoppingLists = []
app.engine('mustache', mustacheExpress())
app.use(bodyParser.urlencoded({extended : false}))

app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req,res){

  models.ShoppingList.findAll().then(function(stores){
    res.render('shoppinglists', {storeList : stores})
  })
})

app.post('/shoppinglists', function(req,res){
  let name = req.body.name
  let street = req.body.street
  let city = req.body.city
  let state = req.body.state

  let store = {
    name : name,
    street : street,
    city : city,
    state : state
  }

  models.ShoppingList.create(store).then(function(newStore){
    res.redirect('/')
  })
})

app.post('/deleteShoppingList', function(req,res){

  models.ShoppingList.destroy({
    where: {
      id : req.body.delete
    }
  }).then(function(){
    res.redirect('/')
  })
})

app.get('/shoppinglists/:name', function(req,res){
  models.ShoppingList.findOne({
    where: {
      name : req.params.name
    }
  }).then(function(shoppinglist){
    res.json(shoppinglist)
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
