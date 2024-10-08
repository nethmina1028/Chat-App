const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const app = express();
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');    //  for user details.js

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));

 app.use(express.json());
app.use(cookiesParser());   //  for user details.js
 
const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
      res.json({
        message : "Server is running " + PORT
      })
});


//api end point

app.use('/api',router);

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
})

});