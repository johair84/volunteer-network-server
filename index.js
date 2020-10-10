const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 5000


const app = express()

app.use(cors());
app.use(bodyParser.json());



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7mufj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const registrations = client.db("volunteerNetwork").collection("registrations");
  
  app.post('/addRegistration', (req, res) =>{
      const newRegistration = req.body;
      registrations.insertOne(newRegistration)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
      console.log(newRegistration);
  })

  app.get('/registrations', (req, res) =>{

    registrations.find({email: req.query.email})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello Programning Hero!')
})

app.listen(process.env.PORT || port);
 