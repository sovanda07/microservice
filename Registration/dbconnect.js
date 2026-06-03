const mongoose = require('mongoose');
const uri = "mongodb://chhornsovanda38_db_user:m1LTbZBJSZKDwftu@ac-rj2yfu0-shard-00-00.nvkreji.mongodb.net:27017,ac-rj2yfu0-shard-00-01.nvkreji.mongodb.net:27017,ac-rj2yfu0-shard-00-02.nvkreji.mongodb.net:27017/database?ssl=true&replicaSet=atlas-ehualh-shard-0&authSource=admin&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
