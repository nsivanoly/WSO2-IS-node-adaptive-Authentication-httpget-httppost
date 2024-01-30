const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post('/validate', (req, res) => {

  const response = {
    "jurisdiction": 'KSA',
    "company_id": "WSO2"
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
