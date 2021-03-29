const express = require("express");
const mongoose = require("mongoose")
const config = require('config')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('../routes/auth.routes'))

app.use('/api/profile', require('../routes/profile.routes'))

async function start (){
  try{
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useCreateIndex : true
    }) 
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (e) {
    console.log("server error", e.message)
    process.exit(1)
  }
}

start()

