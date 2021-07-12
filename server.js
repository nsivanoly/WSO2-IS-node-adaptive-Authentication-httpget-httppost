const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post('/validate', (req, res) => {
  const allowed_domain = "wso2.com"
  let mfa_required = false
  
  console.log(req.body)


  const response = {
    "mfa": {
      "required" : mfa_required
    }
  }

  console.log(response)

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
