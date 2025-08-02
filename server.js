import express, { urlencoded } from 'express'
import path from 'path'
import url from 'url'
import fs from 'fs'

import { CreateEntry, getEntries } from './mongoose.js'

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
  res.end()
})

app.post('/form', async (req, res) => {
  const entry = (await CreateEntry( req.body )).toJSON()
  res.render('formResponse', {title : 'Form Response', formData : req.body, })
  
})

app.get('/entries', async (req, res) => {
  try {
    const entriesData = await getEntries();
    
    // Pass data to template
    res.render('entries', { 
      entriesData: entriesData,
      title: 'All Entries',
      user: req.user // if you have user context
    });
  } catch (err) {
    console.error('Error fetching entries:', err);
    
    // Render error page or send JSON error
    res.status(500).render('error', { 
      message: 'Unable to load entries. Please try again later.',
      error: err.message 
    });
  }
});