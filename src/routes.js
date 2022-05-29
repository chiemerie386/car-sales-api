'use strict'

const Car = require ('./carModel')
const {uploadFile, getFileStream} = require('./s3')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.locals.name = 'car-sales-backend'
    res.send('jk')
  })

  app.get('/cars', async(req,res)=>{
    const cars = await Car.find({})
    console.log(cars,'lkoiu')
    res.status(200).json(cars)
  })


  app.post('/car', upload.single('image'), async(req,res) => {
    console.log(req.body)
    const {name, price, make, year} = req.body
    const file = req.file
    console.log(file, "file")
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result, 'res')
    let image = result.key
    const car = await Car.create( {name, price, make, year, image})

    res.status(200).json(car)
  })
  app.delete('/car/:id', async(req,res)=> {
      const car  = await Car.findByIdAndDelete(req.params.id)
      res.status(200).json(car)
  })
  app.get('/car/images/:key', (req,res)=>{
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
  })
}
