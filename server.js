import express, { urlencoded } from 'express'
import path from 'path'
import url from 'url'
import fs from 'fs'

// database 
import mongoose from 'mongoose'
// connect to database 
mongoose.connect('mongodb://localhost/testdb')
// make database document model
const Entry = mongoose.model("Entry", {
  firstName : String, 
  lastName : String, 
  id : Number
})
// adding to database 
async function CreateEntry(entry) {
  const entryModel = new Entry(entry)
  const result = await entryModel.save();
  console.log(result)
  return result;
}



// filepath and dirName 
const __filePath = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filePath)

// express 
const app = express();

// 
app.use(express.json())
app.use(urlencoded({extended : true}))

// seting view engine 
app.set('view engine', 'pug');
app.set('views', './views')

// listening 
app.listen(3000, () => {
  console.log("Listening on PORT 3000.... ")
})

// importing routes
import homeRouter from './routes/home.js'

// using routes 
app.use('/', homeRouter)

app.get("/form", (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'form.html'))
  const htmlData = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))
  res.write(htmlData)
})

app.post('/form', async (req, res) => {
  // const entry = await CreateEntry( req.body )
  res.render('formResponse', {title : 'Form Response', formData : req.body, })
})