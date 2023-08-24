const express = require('express')
const {engine }= require('express-handlebars')
const app = express()
const restaurants = require('./public/jsons/restaurant.json').results
let filterRestaurants = []
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  filterRestaurants = restaurants
  res.render('index', { filterRestaurants })
})

app.get('/search',(req, res) => {
  const keyword = req.query.keyword
  console.log(keyword)

  if (keyword){
    filterRestaurants = restaurants.filter( rs => {
      return Object.values(rs).some( property =>{
        if (typeof property === 'string'){
          return property.toLowerCase().includes(keyword.toLowerCase())
        }
      })
    })
  } else {
    filterRestaurants = restaurants
  }
  res.render('index', { filterRestaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const oneStore = restaurants.find( restaurant => restaurant.id.toString() === id)
  console.log(oneStore)
  res.render('showPage', { oneStore })
})

app.listen(port, () => {
  console.log(`express server is ruining on https:localhost:${port}`)
})