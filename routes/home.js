import express from 'express'

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.render('home', {title: 'home page', messege : 'this is a messege'})
})

export default homeRouter