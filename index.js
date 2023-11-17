const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const startPage = (req, res) => {
  try {
    fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
      return res.send(data).status(200);
    })
  } catch (e) {
    return res.json({message: e}).status(500);
  }
}

app.get('/', startPage);
app.get('*', (req,res,next)=>{
  return res.status(301).redirect('/')
});

const serverStart = () => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  } catch (e) {
    console.log(e)
  }
}

serverStart();