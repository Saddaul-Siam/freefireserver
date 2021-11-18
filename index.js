const express = require('express')
var cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express()
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kle38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("freeFire");
    const usersCollection = database.collection("users");

    app.post('/user', async (req, res) => {
      const result = await usersCollection.insertOne(req.body);
      res.json(result);
      console.log(result);
    })

  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`prot:${port}`)
})
