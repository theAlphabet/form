import express from 'express'

exportconst formRouter = express.Router();

formRouter.get("/form", (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'form.html'))
  const htmlData = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))
  res.write(htmlData)
})

formRouter.post('/form', async (req, res) => {
  const entry = await CreateEntry( req.body )
  res.send(entry)
})

