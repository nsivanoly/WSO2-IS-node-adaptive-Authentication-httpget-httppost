const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/validate', (req, res) => {
  const allowed_domain = "wso2.com"
  let mfa_required = false

  const email = req.query.email
  const organization = req.query.organization
  const domain = email.split('@').pop()

  if (domain !== allowed_domain)
    mfa_required = true

  const response = {
    "mfa": {
      "required" : mfa_required
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})

app.post('/validate', (req, res) => {
  const allowed_domain = "wso2.com"
  let mfa_required = false

  const email = req.body.email
  const organization = req.body.organization
  const domain = email.split('@').pop()

  if (domain !== allowed_domain)
    mfa_required = true

  const response = {
    "mfa": {
      "required" : mfa_required
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
